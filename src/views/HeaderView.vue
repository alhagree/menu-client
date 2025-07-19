// views/HeaderView.vue
<template>
  <div class="header">
    <img class="header-logo" src="/logo.png" alt="Logo" />
    <h1 class="header-title">اسم المطعم</h1>
    <p class="header-subtitle">Burgers, Desserts, Pasta</p>
    <div class="header-contact">
      <span>📞 0554 701652</span>
      <span>📍 دبي</span>
      <span>🕒 مفتوح 24 ساعة</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderView"
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 10px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #ddd;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 180px;
}
.header-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 5px;
}
.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}
.header-subtitle {
  font-size: 14px;
  color: #666;
  margin: 3px 0 8px;
}
.header-contact {
  font-size: 13px;
  color: #555;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}
</style>