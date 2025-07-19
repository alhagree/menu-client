import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/public/menu`;

export const fetchMenuData = async (linkCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/${linkCode}`);
    return response.data;
  } catch (error) {
    console.error("❌ خطأ في fetchMenuData:", error);
    throw new Error("تعذر تحميل البيانات من الخادم.");
  }
};
