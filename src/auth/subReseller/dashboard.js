import apiService from "../axiosInstance";

export const SubResellerDashboard = async () => {
  try {
    const res = await apiService.get("/api/sub-reseller/dashboard");

    console.log("API SUCCESS:", res.data); // debug

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("API ERROR:", error.response || error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    };
  }
};