import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task, TaskFilterData, TaskStatus } from "../types/task";
import { getTasks, deleteTask } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TaskFilterData>({});

  const fetchTasks = async () => {
    setLoading(true);
    const data = await getTasks(filters);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      const success = await deleteTask(id);
      if (success) {
        fetchTasks();
      }
    }
  };

  const handleFilterChange = (field: keyof TaskFilterData, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "text-green-600";
      case TaskStatus.IN_PROGRESS:
        return "text-blue-600";
      case TaskStatus.PENDING:
        return "text-yellow-600";
      case TaskStatus.CANCELLED:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case TaskStatus.COMPLETED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case TaskStatus.IN_PROGRESS:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case TaskStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case TaskStatus.CANCELLED:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-1 py-8">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 italic">
          Filtros
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio Desde
            </label>
            <input
              type="date"
              className="input"
              value={filters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio Hasta
            </label>
            <input
              type="date"
              className="input"
              value={filters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="delayed-filter"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={!!filters.delayed}
              onChange={(e) => handleFilterChange("delayed", e.target.checked)}
            />
            <label
              htmlFor="delayed-filter"
              className="ml-2 text-sm text-gray-700"
            >
              Solo tareas atrasadas
            </label>
          </div>

          <button onClick={resetFilters} className="ml-auto btn btn-secondary">
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Botón crear tarea */}
      <div className="flex justify-between mb-6">
        <Link to="/tasks/new" className="btn btn-primary font-semibold italic">
          Nueva Tarea
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Cargando tareas...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr>
                <th className="table-header ml-5">ID</th>
                <th className="table-header">Empleado</th>
                <th className="table-header">Proyecto</th>
                <th className="table-header">Descripción</th>
                <th className="table-header">Fecha Inicio</th>
                <th className="table-header">Días Est.</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Fecha Final</th>
                <th className="table-header">Días Atrasados</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="table-cell text-center py-8 text-gray-500"
                  >
                    No hay tareas que mostrar con los filtros actuales
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="table-cell py-3">{task.id}</td>
                    <td className="table-cell py-3">{task.employeeName}</td>
                    <td className="table-cell py-3">{task.projectName}</td>
                    <td className="table-cell py-3">{task.description}</td>
                    <td className="table-cell py-3">
                      {new Date(task.startDate).toLocaleDateString()}
                    </td>
                    <td className="table-cell py-3">{task.estimatedDays}</td>
                    <td className="table-cell py-3">
                      <span className={getStatusBadge(task.status)}>
                        {task.status}
                      </span>
                    </td>
                    <td className="table-cell py-3">
                      {task.endDate
                        ? new Date(task.endDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="table-cell py-3">
                      {task.delayedDays > 0 ? (
                        <span className="text-red-600 font-bold">
                          {task.delayedDays}
                        </span>
                      ) : (
                        "0"
                      )}
                    </td>
                    <td className="table-cell py-3">
                      <div className="flex space-x-2">
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                        >
                          Editar
                        </Link>
                        <button
                          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
                          onClick={() => handleDelete(task.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
