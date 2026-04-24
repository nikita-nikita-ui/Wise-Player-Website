import api from "../axiosInstance";

export const subResellerUserInfo = async () => {
  try {
    const response = await api.get("/api/sub-reseller/users");

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch users",
    };
  }
};

export const createSubResellerUser = async (payload) => {
  try {
    const response = await api.post(
      "/api/sub-reseller/user",
      payload
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create user",
    };
  }
};

export const disableSubResellerUser = async (deviceId) => {
  try {
    const response = await api.put(
      `/api/sub-reseller/users/${deviceId}/disable`
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
};