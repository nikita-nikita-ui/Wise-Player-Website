// import api from "../axiosInstance";

// // GET requests
// export const subResellerActivationRequest = async () => {
//   try {
//     const response = await api.get("/api/sub-reseller/activation-request");

//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message:
//         error.response?.data?.message || "Failed to fetch requests",
//     };
//   }
// };

// // POST request (NEW REQUEST)
// export const submitSubResellerRequest = async (payload) => {
//   try {
//     const response = await api.post(
//       "/api/sub-reseller/activation-request",
//       payload
//     );

//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message:
//         error.response?.data?.message || "Failed to submit request",
//     };
//   }
// };