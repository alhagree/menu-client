<template>
  <div class="popup-backdrop">
    <div class="popup-card">
      <div class="popup-content">
        <!-- الصورة -->
        <img class="popup-img" :src="item.image" alt="صورة" />

        <!-- التفاصيل -->
        <div class="popup-details">
          <h2>{{ item.name }}</h2>

          <!-- تنبيه عدم التوفر -->
          <div v-if="item.available === false" class="popup-unavailable-msg">
            ⚠️ هذا الصنف غير متوفر حالياً
          </div>

          <p class="popup-desc">{{ item.description }}</p>
          <div class="popup-info">
            <span>السعر : {{ item.price }} IQD</span>            
          </div>
          <button class="close-btn" @click="$emit('close')">إغلاق</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style scoped>
.popup-unavailable-msg {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}
</style>
