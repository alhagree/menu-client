// menu-client\src\views\MenuView.vue
<template>
    <div v-if="error" class="error-message">
    الرابط غير صحيح أو غير مفعل.
  </div>
  <div class="menu-view">
    <!-- العنوان واللوغو -->
      <div class="header">
        <h2 class="title">{{ clientName }}</h2>
        <img class="logo" :src="logoUrl" alt="Logo" />
      </div>
    <!-- شريط الأقسام -->
    <div class="sections-nav">
      <div
        class="section-tab"
        v-for="(section, index) in sections"
        :key="section.id"
        :ref="el => sectionTabRefs[index] = el"
        :class="{ active: activeSection === index }"
        @click="scrollToSection(index)"
      >
        <img
          v-if="!isCompact"
          :src="section.image"
          alt="icon"
          class="section-icon"
        />
        <span class="section-name">{{ section.name }}</span>
      </div>
    </div>

    <!-- المحتوى الكامل -->
    <div class="sections-wrapper">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        :ref="el => sectionRefs[index] = el"
        class="section-block"
      >
        <h3 class="section-title">{{ section.name }}</h3>
        <ItemsList :items="section.items" @show-popup="showPopup" />
      </div>
    </div>

    <ItemPopup v-if="selectedItem" :item="selectedItem" @close="selectedItem = null" />
  </div>
  
  <button
    v-if="showScrollTop"
    class="scroll-top-btn"
    @click="scrollToTop">
    ⬆ العودة للأعلى
  </button>

<!-- ✅ الفوتر الثابت -->
<footer class="menu-footer">
  <a
    href="https://tiklamu.com"
    target="_blank"
    rel="noopener"
    class="footer-content"
  >
    <span>TIKLAMU - Software Solution | © 2025 جميع الحقوق محفوظة</span>
  </a>
</footer>


</template>

<script>
import ItemsList from "../components/ItemsList.vue";
import ItemPopup from "../components/ItemPopup.vue";
import { fetchMenuData } from "../services/publicApi.js";

export default {
  components: {
    ItemsList,
    ItemPopup,
  },
  props: {
  menuData: Object
  },
  data() {
    return {
      selectedItem: null,
      activeSection: 0,
      sectionRefs: [],
      sectionTabRefs: [],
      linkCode: "",
      observer: null,
      isSticky: false,
      isCompact: false,
      showScrollTop: false,
      clientName: "",
      sections: [],
      logoUrl: "",
      error: false,
    };
  },
async mounted() {

  window.addEventListener("scroll", () => {
  this.showScrollTop = window.scrollY > 200;
});

  const params = new URLSearchParams(window.location.search);
  const linkCode = params.get("link_code");

  if (!linkCode) {
    this.error = true;
    return;
  }

  this.linkCode = linkCode; // حفظ الرابط للاستخدام

  const baseUrl = import.meta.env.VITE_API_BASE_URL; // استخدام رابط الباك

  try {
    const data = await fetchMenuData(linkCode);

    this.clientName = data.client_name;
    this.logoUrl = data.logo_url || "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/logo.png?updatedAt=1753026004161";

    this.sections = data.sections.map((section) => {
      return {
        id: section.se_id,
        name: section.se_name,
        image: section.se_image || "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/section.jpg?updatedAt=1753025684000",

        items: data.items
          .filter((item) => item.it_se_id === section.se_id)
          .map((item) => ({
            id: item.it_id,
            name: item.it_name,
            description: item.it_description,
            price: item.it_price,
            image: item.it_image || "https://ik.imagekit.io/idbeilkk4/menu_project/defulat_image/item.png?updatedAt=1753025679030",
            available: item.it_available == 1 // ← نضيف هذا
          })),
      };
    });

    this.setupSectionObserver();
  } catch (err) {
    console.error("❌ خطأ في جلب البيانات:", err);
    this.error = true;
  }
},
  methods: {
    scrollToSection(index) {
      const el = this.sectionRefs[index];
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
},
    showPopup(item) {
      this.selectedItem = item;
    },
    setupSectionObserver() {
      const updateActiveSection = () => {
        const offsetTop = window.scrollY;
        let closestIndex = 0;
        let minDistance = Infinity;

        this.sectionRefs.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 150);
          if (distance < minDistance && rect.top < window.innerHeight) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        if (this.activeSection !== closestIndex) {
          this.activeSection = closestIndex;
          const tabEl = this.sectionTabRefs[closestIndex];
          if (tabEl) {
            tabEl.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "nearest",
            });
          }
        }
      };

      window.addEventListener("scroll", updateActiveSection);
      this.$nextTick(updateActiveSection);
    },
  },
};
</script>