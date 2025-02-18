import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Function to refresh token
const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) throw new Error("No refresh token found");

    const response = await axios.post("http://127.0.0.1:8000/api/users/refresh/", { refresh });
    
    localStorage.setItem("access_token", response.data.access);
    return response.data.access; // Return new access token
  } catch (error) {
    console.error("Token refresh failed", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login
  }
};

// Attach access token to requests
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired tokens and refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the original request
      }
    }

    return Promise.reject(error);
  }
);

export default api;
