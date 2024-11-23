import { Task } from "@/interfaces";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error: ", error.response || error.message);
    throw new Error(error.response ? error.response.data : error.message);
  } else {
    console.error("Unexpected error: ", error);
    throw new Error("An unexpected error occurred.");
  }
};

export const apiService = {
  getColumns: async () => {
    try {
      const response = await api.get("/columns");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createColumn: async (data: any) => {
    try {
      const response = await api.post("/columns", data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateColumn: async (columnId: number, data: any) => {
    try {
      const response = await api.patch(`/columns/${columnId}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteColumn: async (columnId: number) => {
    try {
      const response = await api.delete(`/columns/${columnId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createTask: async (data: any) => {
    try {
      const response = await api.post("/tasks", data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateTask: async (taskId: number, data: any) => {
    try {
      const response = await api.patch(`/tasks/${taskId}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteTask: async (taskId: number) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
