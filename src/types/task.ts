export enum TaskStatus {
  PENDING = "Pendiente",
  IN_PROGRESS = "En Progreso",
  COMPLETED = "Completada",
  CANCELLED = "Cancelada",
}

export interface Task {
  id: number;
  employeeName: string;
  projectName: string;
  description: string;
  startDate: string;
  estimatedDays: number;
  status: TaskStatus;
  endDate: string | null;
  delayedDays: number;
}

export interface TaskFormData {
  employeeName: string;
  projectName: string;
  description: string;
  startDate: string;
  estimatedDays: number;
  status: TaskStatus;
  endDate: string | null;
}

export interface TaskFilterData {
  startDate?: string;
  endDate?: string;
  delayed?: boolean;
}
