// import axios from "axios";
// import api from "./axiosInstance";
// const token = localStorage.getItem("token");


// export const submitRequest = async (data) => {
//   try {
//     const response = await api.post(
//       "/api/reseller/activation-request",
//       {
//         deviceId: data?.deviceId,
//         planName: data?.planName
//       }
//     );

//     return {
//       success: true,   // ✅ ADD THIS
//       data: response.data
//     };

//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to create request",
//     };
//   }
// };

// export const ActivationplanRequest = async (data )=>{
  
//   try{
//     const response = await api.get(
//       "/api/payment/public/plans",
//     );
//     console.log('response : ', response.data);
//     return response?.data

//   }catch(error){
//     return error.message
//   }
// }



