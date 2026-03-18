import axios from 'axios';

import api from './axiosInstance'; 

export const registerReseller = async (formData) => {
  try {
    const response = await api.post('/api/reseller/register', formData);
    
    // SAVE TOKEN HERE
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Registration failed' 
    };
  }
};