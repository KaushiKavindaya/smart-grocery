import axios from 'axios';

// 10.0.2.2 points to localhost when using the Android Studio Emulator
// If you are testing on a physical phone via Expo Go, replace 10.0.2.2 with your computer's Wi-Fi IP (e.g., 192.168.1.5)
export const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});