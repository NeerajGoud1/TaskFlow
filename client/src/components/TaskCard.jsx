import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";
import { useTask } from "../contexts/TaskContext";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [toggling, setToggling] = useState(false);
  const { updateTask, deleteTask } = useTask();

  const handleStatusToggle = async () => {
    if (toggling) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      setToggling(true);

      await updateTask(task._id, { status: newStatus });
    } catch (err) {
      console.error("Failed to toggle status:", err);

      alert("Could not update status. Please try again.");
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task._id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "low":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  return (
    <>
      <div
        className={`card hover:shadow-md transition-shadow ${
          task.status === "completed" ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={handleStatusToggle}
              className={`mt-1 text-gray-400 hover:text-primary-600 transition-colors ${
                toggling ? "opacity-60 cursor-wait" : ""
              }`}
              title={
                task.status === "completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
              aria-pressed={task.status === "completed"}
              aria-label={
                task.status === "completed"
                  ? "Mark task as pending"
                  : "Mark task as completed"
              }
              type="button"
              disabled={toggling}
            >
              {task.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-gray-900 ${
                  task.status === "completed" ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.charAt(0).toUpperCase() +
                    task.status.slice(1).replace("-", " ")}
                </span>

                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </span>

                {task.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {task.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                {task.dueDate && (
                  <div
                    className={`flex items-center gap-1 ${
                      isOverdue ? "text-red-600" : ""
                    }`}
                  >
                    {isOverdue ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                    <span>
                      {format(new Date(task.dueDate), "MMM dd, yyyy")}
                      {isOverdue && " (Overdue)"}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(task.createdAt), "MMM dd")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
              title="Edit task"
            >
              <Edit2 className="h-4 w-4" />
            </button>

            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;
