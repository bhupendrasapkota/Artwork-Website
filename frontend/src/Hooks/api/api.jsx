import axios from "axios";

/* --- Axios Instance --- */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

/* --- Token Management --- */
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username"); // ✅ Clear stored username
  cachedUserInfo = null; // ✅ Clear cached user info
  window.location.href = "/login";
};

/* --- Refresh Token Handling (Ensures Only One Request at a Time) --- */
let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return clearAuth();

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push(resolve);
    });
  }

  isRefreshing = true;

  try {
    const { data } = await axios.post(`${api.defaults.baseURL}users/refresh/`, {
      refresh,
    });
    setTokens(data.access, refresh);
    isRefreshing = false;
    onTokenRefreshed(data.access);
    return data.access;
  } catch (error) {
    console.error("Token refresh failed", error);
    isRefreshing = false;
    clearAuth();
    return null;
  }
};

/* --- Axios Interceptors --- */

api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

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

    if (error.response?.status === 401) {
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

/* --- API Request Handler (Ensures No Unauthorized Errors) --- */
const fetchData = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const response = await api({ url: endpoint, method, data, headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    return null;
  }
};

/* --- API Calls --- */
export const fetchAllUsers = async () => {
  return await fetchData("/users/all/");
};

export const fetchRecentPosts = async () => {
  return await fetchData("posts/latest-six/");
};

export const fetchCategories = async () =>
  (await fetchData("/posts/categories/"))?.categories || [];
export const fetchPosts = async (page = 1, pageSize = 50) =>
  (await fetchData(`/posts/all/?page=${page}&page_size=${pageSize}`))
    ?.results || [];
export const fetchMostLikedPosts = async () =>
  (await fetchData("/posts/most-liked/")) || [];

let cachedUserInfo = null;
export const fetchUserInfo = async () => {
  if (cachedUserInfo) return cachedUserInfo;

  const data = await fetchData("/users/user-info/");
  if (data) {
    cachedUserInfo = data;
    localStorage.setItem("username", data.username); // ✅ Store username for better navigation
  }
  return cachedUserInfo || { username: "Unknown", profile_picture: "" };
};

export const fetchUserPosts = async () => {
  const user = await fetchUserInfo();
  if (!user?.id) return [];
  return (await fetchData(`/posts/user/${user.id}/`))?.results || [];
};

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

export const fetchProfileData = async (setProfile, setError, setLoading) => {
  setLoading(true);
  try {
    setProfile(await fetchData("/profile/get-profile/"));
  } catch (error) {
    setError(error.response?.data?.detail || "Failed to load profile.");
  } finally {
    setLoading(false);
  }
};

export const updateProfile = async (profile, selectedFile, setState) => {
  setState((prev) => ({ ...prev, loading: true, error: null }));

  try {
    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("bio", profile.bio);
    formData.append("about_me", profile.about_me);
    formData.append("contact", profile.contact);
    if (selectedFile) formData.append("profile_picture", selectedFile);

    await api.put("/profile/update-profile/", formData);
    setState((prev) => ({ ...prev, isEditing: false, isMove: false }));
  } catch (error) {
    setState((prev) => ({ ...prev, error: "Failed to update profile." }));
  } finally {
    setState((prev) => ({ ...prev, loading: false }));
  }
};

export default api;
