<!-- menu-client/src/App.vue -->
<template>
  <div id="app">
    <div v-if="loading" class="centered-container">
      <img class="failed-image" :src="logoUrl" alt="Logo" />
      <p class="loading-text">جاري التحميل...</p>
    </div>

    <div v-else-if="error" class="centered-container">
      <img class="failed-image" :src="logoUrl" alt="Logo" />
      <p class="error-message">{{ error }}</p>
      <img class="failed-image" :src="errorImage" alt="فشل" />
    </div>

    <div v-else>
      <MenuView :menu-data="menuData" />
    </div>
  </div>
</template>

<script>
import MenuView from "./views/MenuView.vue";
import { fetchMenuData } from "./services/publicApi";

export default {
  components: { MenuView },
data() {
  return {
    loading: true,
    error: null,
    errorType: null,
    menuData: null,
    logoUrl:
      "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/logo.png",
    failedImageUrl:
      "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/failed.png",
    errorImages: {
      "الحساب غير مفعل": "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/inactive.png",
      "لا يوجد اشتراك فعّال": "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/no-subscription.png",
      "انتهت صلاحية الاشتراك": "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/expired.png"
    },
    errorColors: {
      "الحساب غير مفعل": "#ffc107",          // أصفر
      "لا يوجد اشتراك فعّال": "#6c757d",     // رمادي
      "انتهت صلاحية الاشتراك": "#dc3545"     // أحمر
    }
  };
},
computed: {
  errorImage() {
    return this.errorImages[this.errorType] || this.failedImageUrl;
  },
  errorColor() {
    return this.errorColors[this.errorType] || "#dc3545"; // الافتراضي أحمر
  }
},
async mounted() {
  const params = new URLSearchParams(window.location.search);
  const linkCode = params.get("link_code");
  this.linkCode = linkCode;

  if (!linkCode) {
    this.error = "الرابط غير صحيح أو مفقود.";
    this.loading = false;
    return;
  }

try {
  const data = await fetchMenuData(linkCode);
  this.menuData = data;
} catch (err) {
  console.error("❌ API Error:", err);

  if (err.response?.data?.message) {
    this.error = err.response.data.message;
    this.errorType = err.response.data.message;
  } else {
    this.error = "فشل في تحميل البيانات. تأكد من صحة الرابط.";
    this.errorType = null;
  }
}
 finally {
    this.loading = false;
  }
},
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #eef1f4;
  padding: 40px 20px 20px;
  text-align: center;
}


.loading-text,
.error-message {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;  
}

.error-message {
  color: #dc3545;
}

.failed-image
{
  max-width: 280px;
  height: auto;
  object-fit: contain;
  display: block;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
