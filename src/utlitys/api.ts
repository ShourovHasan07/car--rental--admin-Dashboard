// src/utils/api.ts
import axios, { AxiosInstance, AxiosError } from "axios";

const API = process.env.NEXT_PUBLIC_API; // from .env.local

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if backend uses cookies
});

// Generic request handler
export const request = async <T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): Promise<T> => {
  try {
    const response = await api.request<T>({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || error.message || "API Error"
      );
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

export default api;
