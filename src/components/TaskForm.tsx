import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { TaskFormData, TaskStatus } from "../types/task";
import { getTask, createTask, updateTask } from "../services/taskService";

const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<TaskFormData>({
    employeeName: "",
    projectName: "",
    description: "",
    startDate: "",
    estimatedDays: 1,
    status: TaskStatus.PENDING,
    endDate: null,
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (isEditMode && id) {
        const taskData = await getTask(parseInt(id));
        if (taskData) {
          setFormData({
            employeeName: taskData.employeeName,
            projectName: taskData.projectName,
            description: taskData.description,
            startDate: taskData.startDate,
            estimatedDays: taskData.estimatedDays,
            status: taskData.status,
            endDate: taskData.endDate,
          });
        }
        setLoading(false);
      } else {
        // aqui verificamos si no es modo edicion y no tenemos id
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimatedDays" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode && id) {
        await updateTask(parseInt(id), formData);
      } else {
        await createTask(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const formLabel = "block text-sm font-medium text-gray-100 mb-1";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="ml-2">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? "Editar Tarea" : "Nueva Tarea"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="employeeName" className={formLabel}>
                Empleado Asignado *
              </label>
              <input
                id="employeeName"
                name="employeeName"
                type="text"
                required
                className="input"
                value={formData.employeeName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="projectName" className={formLabel}>
                Proyecto Asignado *
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                required
                className="input"
                value={formData.projectName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className={formLabel}>
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="input"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label htmlFor="startDate" className={formLabel}>
                  Fecha de Inicio *
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  className="input"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="estimatedDays" className={formLabel}>
                  Días Estimados *
                </label>
                <input
                  id="estimatedDays"
                  name="estimatedDays"
                  type="number"
                  min={1}
                  required
                  className="input"
                  value={formData.estimatedDays}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className={formLabel}>
                  Estado *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="input"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value={TaskStatus.PENDING}>
                    {TaskStatus.PENDING}
                  </option>
                  <option value={TaskStatus.IN_PROGRESS}>
                    {TaskStatus.IN_PROGRESS}
                  </option>
                  <option value={TaskStatus.COMPLETED}>
                    {TaskStatus.COMPLETED}
                  </option>
                  <option value={TaskStatus.CANCELLED}>
                    {TaskStatus.CANCELLED}
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="endDate" className={formLabel}>
                  Fecha de Fin
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="input"
                  value={formData.endDate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Link to="/" className="btn btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Actualizar" : "Crear"} Tarea
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
