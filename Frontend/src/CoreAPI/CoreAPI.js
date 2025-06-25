// src/api/core.js
import { BASE_URL } from "./config";

// POST /login
export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return await res.json(); // Should return user + token if successful
  } catch (err) {
    throw err;
  }
};

// POST /register
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");

    return await res.json();
  } catch (err) {
    throw err;
  }
};
