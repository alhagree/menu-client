<!-- menu-client/src/App.vue -->
<template>
  <div id="app">
    <div v-if="loading" class="centered-container">
      <img class="logo" :src="logoUrl" alt="Logo" />
      <p class="loading-text">جاري التحميل...</p>
    </div>

    <div v-else-if="error" class="centered-container">
      <img class="logo" :src="logoUrl" alt="Logo" />
      <p class="error-message">{{ error }}</p>
      <img class="failed-image" :src="failedImageUrl" alt="فشل" />
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
      menuData: null,
      logoUrl:
        "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/logo.png?updatedAt=1753026004161",
      failedImageUrl:
        "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/failed.jpg?updatedAt=1753027482825",
    };
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
      this.error = "فشل في تحميل البيانات. تأكد من صحة الرابط.";
      console.error("❌ API Error:", err);
    } finally {
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
  justify-content: start;
  height: 100vh;
  background-color: #eef1f4;
  padding: 20px;
  text-align: center;
}

.logo {
  width: 100px;
  margin-bottom: 15px;
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

.failed-image {
  max-width: 280px;
  height: auto;
  object-fit: contain;
}
</style> 
