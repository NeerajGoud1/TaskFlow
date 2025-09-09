import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useTask } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import TaskCard from "../components/TaskCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, stats, loading, fetchTasks, fetchTaskStats } = useTask();
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchTaskStats();
    fetchTasks({ limit: 5, sort: "-createdAt" }).then(() => {
      // The tasks will be set in context, we'll use them for recent tasks
    });
  }, [fetchTasks, fetchTaskStats]);

  useEffect(() => {
    setRecentTasks(tasks.slice(0, 5));
  }, [tasks]);

  const statsCards = [
    {
      name: "Total Tasks",
      value: stats.total || 0,
      icon: BarChart3,
      color: "bg-blue-500",
      changeType: "positive",
    },
    {
      name: "Completed",
      value: stats.completed || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      changeType: "positive",
    },
    {
      name: "Pending",
      value: stats.pending || 0,
      icon: AlertCircle,
      color: "bg-red-500",
      changeType: "negative",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()}, {user?.name}!
        </h1>
        <p className="text-primary-100 mb-4">
          Here's an overview of your tasks and productivity.
        </p>
        <Link
          to="/tasks"
          className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Task
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`ml-2 text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tasks Completion
          </h3>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium text-green-600">
                {stats.total > 0
                  ? Math.round((stats.completed / stats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Tasks
            </h3>
            <Link
              to="/tasks"
              className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {recentTasks.length > 0 ? (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() +
                            task.status.slice(1).replace("-", " ")}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No tasks yet
              </h4>
              <p className="text-gray-500 mb-4">
                Create your first task to get started!
              </p>
              <Link
                to="/tasks"
                className="btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
