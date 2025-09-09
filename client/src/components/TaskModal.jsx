import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTask } from "../contexts/TaskContext";

const TaskModal = ({ isOpen, onClose, task = null }) => {
  const [loading, setLoading] = useState(false);
  const { createTask, updateTask } = useTask();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      category: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title ?? "",
          description: task.description ?? "",
          priority: task.priority ?? "medium",
          status: task.status ?? "pending",
          category: task.category ?? "",
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "",
        });
      } else {
        reset({
          title: "",
          description: "",
          priority: "medium",
          status: "pending",
          category: "",
          dueDate: "",
        });
      }
    } else {
      reset();
    }
  }, [isOpen, task, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const rawTitle = data.title ?? "";
      const title = rawTitle.trim();

      if (!title) {
        setError("title", { type: "manual", message: "Title is required" });
        setLoading(false);
        return;
      }
      if (title.length < 1 || title.length > 100) {
        setError("title", {
          type: "manual",
          message: "Title must be between 1 and 100 characters",
        });
        setLoading(false);
        return;
      }

      const taskData = {
        title,
        description: data.description?.trim() || undefined,
        priority: data.priority ?? "medium",
        status: data.status ?? "pending",
        category: data.category?.trim() || undefined,
        dueDate: data.dueDate || undefined,
      };

      let result;
      if (isEditing) {
        result = await updateTask(task._id, taskData);
      } else {
        result = await createTask(taskData);
      }

      if (result && result.success) {
        onClose();

        reset();
      } else {
        const msg = (result && result.message) || "Failed to save task";

        setError("title", { type: "manual", message: msg });
      }
    } catch (error) {
      console.error("Task operation failed:", error);
      setError("title", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Task" : "Create New Task"}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter task title"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 100,
                      message: "Title cannot exceed 100 characters",
                    },
                  })}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="input-field"
                  placeholder="Enter task description"
                  {...register("description", {
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  })}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="input-field" {...register("priority")}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="input-field" {...register("status")}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter category (optional)"
                  {...register("category", {
                    maxLength: {
                      value: 50,
                      message: "Category cannot exceed 50 characters",
                    },
                  })}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  {...register("dueDate")}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : isEditing
                    ? "Update Task"
                    : "Create Task"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskModal;
