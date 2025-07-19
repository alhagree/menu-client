//menu-client\src\App.vue
<template>
  <div id="app">
    <div v-if="loading">جاري التحميل...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
<MenuView :menu-data="menuData" />


    </div>
  </div>
</template>

<script>
import MenuView from "./views/MenuView.vue";
import { fetchMenuData } from "./services/publicApi";

export default {
  components: {
    MenuView,
  },
  data() {
    return {
      loading: true,
      error: null,
      menuData: null,
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

<style>
.error {
  color: red;
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>
