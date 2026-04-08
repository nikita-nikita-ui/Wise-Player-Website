import axios from "axios";
import api from "./axiosInstance";
const token = localStorage.getItem("token");


export const getBalance = async (data) => {
  try {
    const response = await api.post(
      "/api/reseller/sub-resellers",
      data, // ✅ send directly
    );
   
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create reseller",
    };
  }
};