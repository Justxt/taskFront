import axios from "axios";
import { Task, TaskFormData, TaskFilterData } from "../types/task";
import { API_URL } from "../config/env";

export const getTasks = async (filters?: TaskFilterData): Promise<Task[]> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      if (filters.delayed) params.append("delayed", String(filters.delayed));
    }

    const response = await axios.get(
      `${API_URL}${params.toString() ? `?${params.toString()}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTask = async (id: number): Promise<Task | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    return null;
  }
};

export const createTask = async (task: TaskFormData): Promise<Task | null> => {
  try {
    const response = await axios.post(API_URL, task);
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
    const response = await axios.patch(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    return null;
  }
};

export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    return false;
  }
};
