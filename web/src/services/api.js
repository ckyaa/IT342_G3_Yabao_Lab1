const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";
const ACCESS_TOKEN_KEY = "accessToken";
const USER_EMAIL_KEY = "userEmail";

const parseResponseBody = async (response) => {
  const rawBody = await response.text();
  if (!rawBody) return null;

  try {
    return JSON.parse(rawBody);
  } catch {
    return { message: rawBody };
  }
};

export const setAuthSession = (authData) => {
  if (!authData?.accessToken) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
  localStorage.setItem(USER_EMAIL_KEY, authData.email || "");
};

export const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getAuthEmail = () => localStorage.getItem(USER_EMAIL_KEY);

export const isAuthenticated = () => Boolean(getAccessToken());

// Register user (POST /users)
export const registerUser = async (data) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(parsedBody?.message || "Registration failed");
  }

  return parsedBody;
};

// Login user (POST /auth/login)
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(parsedBody?.message || "Login failed");
  }

  return parsedBody;
};

