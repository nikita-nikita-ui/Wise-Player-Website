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
      deviceId: macAddress   // ✅ correct place
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

export const validateDevice = async (fingerprint) => {
  try {
    const payload = { fingerprint };

    const response = await api.post('/api/device/validate', payload); // ✅ yaha change

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error("Device Validation Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Device validation failed",
      error: error.response?.data
    };
  }
};


export const saveM3uPlaylist = async (macAddress, playlistData) => {
  try {
    if (!macAddress) {
      return { success: false, message: "MAC address is missing!" };
    }

    const url = `https://api.wise-player.com/api/playlist/public/${macAddress}/m3u`;

    const response = await axios.post(url, {
      name: playlistData.name,
      m3uUrl: playlistData.m3uUrl
    });

    return {
      success: true,
      message: response.data.message || "Playlist saved!"
    };
  } catch (error) {
    console.error("API Error Detail:", error.response); // Error check karne ke liye
    return {
      success: false,
      message: error.response?.data?.error || error.response?.data?.message || 'Failed to save playlist'
    };
  }
};

// export const checkoutPayment = async ({ deviceId, planName }) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await api.post(
//       '/api/payment/public/checkout',
//       { deviceId: deviceId, planName: planName },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     return {
//       success: true,
//       data: response.data
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Payment checkout failed'
//     };
//   }
// };


export const checkoutPayment = async ({ deviceId, planName, successUrl, cancelUrl }) => { // <--- Ye parameters add karein
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      '/api/payment/public/checkout',
      {
        deviceId: deviceId,
        planName: planName,
        successUrl: successUrl,
        cancelUrl: cancelUrl
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Payment checkout failed'
    };
  }
};
export const fetchPublicPlans = async () => {
  try {
    const response = await api.get('/api/payment/public/plans');
    return response.data; // API ka data return karega
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const submitSupportTicket = async (ticketData) => {
  try {
    const formData = new FormData();
    formData.append('firstName', ticketData.firstName);
    formData.append('lastName', ticketData.lastName);
    formData.append('email', ticketData.email);
    formData.append('macAddress', ticketData.macAddress);
    formData.append('inquiryType', ticketData.inquiryType);
    formData.append('message', ticketData.message);
    if (ticketData.attachment) {
      formData.append('attachment', ticketData.attachment);
    }
    const response = await api.post('/api/public/support/ticket', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit ticket'
    };
  }
};


export const downloadInvoicePdf = async (deviceId, invoiceNo) => {
  try {
    const response = await api.get(`/api/payment/public/invoice/${invoiceNo}/pdf`, {
      params: { deviceId, invoiceNo },
      responseType: 'blob',
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Download failed' };
  }
};