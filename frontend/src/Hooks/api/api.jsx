import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000, // Set a timeout to avoid hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieve tokens
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

// Save tokens
const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

// Clear tokens and redirect to login
const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

// Refresh token function
const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return clearAuth();

  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/refresh/",
      { refresh }
    );
    setTokens(data.access, refresh); // Update access token only
    return data.access;
  } catch (error) {
    console.error("Token refresh failed", error);
    clearAuth();
  }
};

// Axios request interceptor for attaching tokens
api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor for handling expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    if (error.response?.status === 403) {
      console.error("Forbidden: You don't have permission for this action.");
    }

    return Promise.reject(error);
  }
);

// Function for handling API requests
const fetchData = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.response?.data || error);
    return null;
  }
};

/* --- API Calls --- */

// Fetch categories
export const fetchCategories = async () => {
  const data = await fetchData("/posts/categories/");
  return data?.categories || [];
};

// Fetch all posts with pagination
export const fetchPosts = async (page = 1, pageSize = 10) => {
  const data = await fetchData(
    `/posts/all/?page=${page}&page_size=${pageSize}`
  );
  return data?.results || [];
};

// Fetch most liked posts
export const fetchMostLikedPosts = async () => {
  return (await fetchData("/posts/most-liked/")) || [];
};

// Fetch user info once and store it (avoid redundant calls)
let cachedUserInfo = null;
export const fetchUserInfo = async () => {
  if (cachedUserInfo) return cachedUserInfo;

  const data = await fetchData("/users/user-info/");
  cachedUserInfo = data || { username: "Unknown", profile_picture: "" };
  return cachedUserInfo;
};

export const fetchUserPosts = async () => {
  const user = await fetchUserInfo();
  if (!user?.id) return [];

  const response = await fetchData(`/posts/user/${user.id}/`);
  return Array.isArray(response) ? response : response?.results || [];
};

// Upload post (optimized)
export const uploadPost = async (image, title, description, category) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  return await fetchData("/posts/create/", "POST", formData, {
    "Content-Type": "multipart/form-data",
  });
};

// Fetch profile data (optimized with loading state)
export const fetchProfileData = async (setProfile, setError, setLoading) => {
  setLoading(true);
  try {
    const data = await fetchData("/profile/get-profile/");
    setProfile(data);
  } catch (error) {
    setError(error.response?.data?.detail || "Failed to load profile.");
  } finally {
    setLoading(false);
  }
};

// Update profile (cleaner structure)
export const updateProfile = async (profile, selectedFile, setState) => {
  setState((prev) => ({ ...prev, loading: true, error: null }));

  try {
    const formData = new FormData();
    Object.keys(profile).forEach((key) => formData.append(key, profile[key]));
    if (selectedFile) formData.append("profile_picture", selectedFile);

    await fetchData("/profile/update-profile/", "PUT", formData, {
      "Content-Type": "multipart/form-data",
    });

    setState((prev) => ({ ...prev, isEditing: false, isMove: false }));
    await fetchProfileData(setState);
  } catch (error) {
    setState((prev) => ({ ...prev, error: "Failed to update profile." }));
  } finally {
    setState((prev) => ({ ...prev, loading: false }));
  }
};

export default api;
