<template>
  <div class="popup-backdrop">
    <div class="popup-card">
      <div class="popup-content">
        <!-- الصورة -->
        <img class="popup-img" :src="item.image" alt="صورة" />

        <!-- التفاصيل -->
        <div class="popup-details">
          <h2>{{ item.name }}</h2>
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