import axios from "axios";
import { Task, TaskFormData, TaskFilterData } from "../types/task";

const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/tasks`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (filters?: TaskFilterData): Promise<Task[]> => {
  try {
    // Construye los parámetros de consulta directamente
    const response = await apiClient.get("/", { params: filters }); // Usa la instancia apiClient
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTask = async (id: number): Promise<Task | null> => {
  try {
    const response = await apiClient.get(`/${id}`); // Usa la instancia apiClient
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    return null;
  }
};

export const createTask = async (task: TaskFormData): Promise<Task | null> => {
  try {
    const response = await apiClient.post("/", task); // Usa la instancia apiClient
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

export const updateTask = async (
  id: number,
  task: Partial<TaskFormData>
): Promise<Task | null> => {
  try {
    const response = await apiClient.patch(`/${id}`, task); // Usa la instancia apiClient
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    return null;
  }
};

export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/${id}`); // Usa la instancia apiClient
    return true;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    return false;
  }
};
