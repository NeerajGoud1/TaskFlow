import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { taskAPI } from "../services/api";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks(params);
      setTasks(response.data.data);
      console.log(response.data.data);

      console.log("Fetched tasks:", response.data.data);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      toast.error("Failed to fetch tasks");
      console.error("Fetch tasks error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskStats = useCallback(async () => {
    try {
      const response = await taskAPI.getTasks();
      const notcompleted = response.data.data.filter(
        (task) => task.status !== "completed"
      );
      setStats((prevStats) => ({
        ...prevStats,
        total: response.data.data.length,
        pending: notcompleted.length,
        completed: response.data.data.length - notcompleted.length,
      }));
      console.log("Fetched stats:", response.data.data);
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  }, []);

  const createTask = async (taskData) => {
    console.log(taskData);

    try {
      const response = await taskAPI.createTask(taskData);
      setTasks((prev) => [response.data.data, ...prev]);
      toast.success("Task created successfully!");
      fetchTaskStats();
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create task";
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.updateTask(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data.data : task))
      );
      toast.success("Task updated successfully!");
      fetchTaskStats();
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update task";
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
      fetchTaskStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete task";
      toast.error(message);
      return { success: false, message };
    }
  };

  const getTask = async (id) => {
    try {
      const response = await taskAPI.getTask(id);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get task";
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    tasks,
    loading,
    stats,
    pagination,
    fetchTasks,
    fetchTaskStats,
    createTask,
    updateTask,
    deleteTask,
    getTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
