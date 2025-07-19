import axios from "axios";

// عدّل هذا الرابط حسب بيئة العمل (لوكال أو سيرفر)
const BASE_URL = "http://localhost:3000/api/public/menu"; // أو رابط السيرفر الحقيقي عند النشر

export const fetchMenuData = async (linkCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/${linkCode}`);
    return response.data;
  } catch (error) {
    console.error("❌ خطأ في fetchMenuData:", error);
    throw new Error("تعذر تحميل البيانات من الخادم.");
  }
};
