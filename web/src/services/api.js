import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
});

// Token management
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Initialize token from storage on app load
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    const { accessToken } = response.data;
    if (accessToken) {
      setAuthToken(accessToken);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logoutUser = () => {
  setAuthToken(null);
};
