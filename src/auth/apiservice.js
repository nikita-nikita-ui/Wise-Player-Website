import axios from 'axios';

import api from './axiosInstance'; 



export const registerReseller = async (formData) => {
  try {
    const response = await api.post('/api/reseller/register', formData);
    

    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Registration failed' 
    };
  }
};


export const loginReseller = async (credentials) => {
  try {
    const response = await api.post('/api/reseller/login', credentials);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data)); 
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    };
  }
};


export const generateDeviceKey = async (macAddress) => {
  try {
    const response = await api.post('/api/device/key', {
      fingerprint: macAddress   // ✅ correct place
    });

    return { 
      success: true, 
      data: response.data 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to generate activation key' 
    };
  }
};

export const activateDeviceApi = async (deviceId, activationKey) => {
  try {
    const response = await fetch('https://api.wise-player.com/api/device/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceId: deviceId,       // Screenshot wala "deviceId"
        activationKey: activationKey // Screenshot wala "activationKey"
      }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: "Server connection failed" };
  }
};