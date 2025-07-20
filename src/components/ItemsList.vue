<template>
  <div class="items-grid">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :ref="el => itemRefs.push(el)"
      class="item-card"
      :class="[
        { 'fade-in': fadeInItems.includes(item.id) },
        { 'not-available': item.available === false }
      ]"
      @click="item.available !== false && $emit('show-popup', item)"
    >
      <img class="item-img" :src="item.image" alt="صورة" />
      <div class="item-info">
        <div class="item-header">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">IQD {{ item.price }}</div>
        </div>
        <div class="item-description">{{ item.description }}</div>
        <span v-if="item.badge" class="badge">جديد</span>
        <span v-if="item.available === false" class="unavailable-badge">غير متاح</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      fadeInItems: [],
      observer: null,
      itemRefs: [],
    };
  },
  mounted() {
    this.itemRefs = [];
    this.initObserver();
  },
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    initObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = this.itemRefs.indexOf(entry.target);
              const item = this.items[index];
              if (item && !this.fadeInItems.includes(item.id)) {
                this.fadeInItems.push(item.id);
              }
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      this.$nextTick(() => {
        this.itemRefs.forEach((el) => {
          if (el) this.observer.observe(el);
        });
      });
    },
  },
};
</script>

<style scoped>
.item-card.not-available {
  background-color: #f8d7da;
  opacity: 0.7;
  pointer-events: none;
  position: relative;
}

.unavailable-badge {
  background-color: #dc3545;
  color: #fff;
  font-size: 0.85em;
  padding: 4px 8px;
  text-align: center;
  border-radius: 6px;
  margin-top: 8px;
  display: inline-block;
  font-weight: bold;
}
</style>
