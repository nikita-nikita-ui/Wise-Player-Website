import axios from "axios";
import api from "./axiosInstance";
const token = localStorage.getItem("token");

export const purchaseCredit = async (coin) => {
  try {
    console.log('API Call :', coin)
    const response = await api.post(
      "/api/reseller/credits/purchase",
      {creditAmount:coin}, // ✅ send directly
    );
    console.log(response)
   if( response.status == 200){
    return {data : response.data}
   }
   
    // return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create reseller",
    };
  }
};