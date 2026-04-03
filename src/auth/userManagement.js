import axios from 'axios';
import api from './axiosInstance'; 
const token = localStorage.getItem("token");


export const subscibedUserinfo = async () => {
  try {
    // ya jahan store kiya hai

    const response = await api.get('/api/reseller/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return { success: true, data: response.data };

  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch dashboard data'
    };
  }
};


export const DisableUserAccount = async (deviceId)=>{
    try {
    // ya jahan store kiya hai

    const response = await api.put(`/api/reseller/users/${deviceId}/disable`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return { success: true, data: response.data };

  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch dashboard data'
    };
  }
}


export const createUser = async (deviceId) => {
  try {

    const response = await api.post(
      `/api/reseller/user`,
      {
        deviceId: deviceId, // ✅ body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ good practice
        },
      }
    );

    return { success: true, data: response.data };

  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to create user",
    };
  }
};