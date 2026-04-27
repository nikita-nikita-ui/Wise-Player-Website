import api from "../axiosInstance";

export const purchaseSubResellerCredit = async (coin) => {
  try {
    const response = await api.post(
      "/api/sub-reseller/credits/purchase",
      { creditAmount: coin }
    );

    if (response.status === 200) {
      return { data: response.data };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to purchase credits",
    };
  }
};