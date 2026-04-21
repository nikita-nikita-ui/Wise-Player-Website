import axios from "axios";
import api from "./axiosInstance";
const token = localStorage.getItem("token");

export const createReseller = async (data) => {
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

export const getAllResellerInfo = async () => {
  try {
    const response = await api.get("api/reseller/sub-resellers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create reseller",
    };
  }
};


export const transferCredits = async (payload) => {
  try {
    const response = await api.post(
      "/api/reseller/credits/transfer",
      payload
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Transfer failed",
    };
  }
};