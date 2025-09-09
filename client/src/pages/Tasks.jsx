import { useEffect, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useTask } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import LoadingSpinner from "../components/LoadingSpinner";

const Tasks = () => {
  const { tasks, loading, pagination, fetchTasks } = useTask();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    category: "",
    page: 1,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = {
      ...filters,
      limit: 10,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === "") {
        delete params[key];
      }
    });

    fetchTasks(params);
  }, [filters, fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      category: "",
      page: 1,
    });
  };

  const hasActiveFilters =
    filters.search || filters.status || filters.priority || filters.category;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">
            Manage and organize your tasks
            {pagination.total > 0 && (
              <span className="ml-1">({pagination.total} total)</span>
            )}
          </p>
        </div>

        <button
          onClick={() => setShowTaskModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="input-field pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center ${
              hasActiveFilters
                ? "bg-primary-50 text-primary-700 border-primary-200"
                : ""
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {
                  [filters.status, filters.priority, filters.category].filter(
                    Boolean
                  ).length
                }
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="input-field"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="input-field"
                  value={filters.priority}
                  onChange={(e) =>
                    handleFilterChange("priority", e.target.value)
                  }
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Filter by category"
                  className="input-field"
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tasks List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.page - 1) * 10 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(pagination.page * 10, pagination.total)}
                    </span>{" "}
                    of <span className="font-medium">{pagination.total}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          pagination.page === i + 1
                            ? "z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {hasActiveFilters ? "No tasks found" : "No tasks yet"}
          </h3>
          <p className="mt-2 text-gray-500">
            {hasActiveFilters
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first task."}
          </p>
          <div className="mt-6">
            {hasActiveFilters ? (
              <button onClick={clearFilters} className="btn-secondary">
                Clear filters
              </button>
            ) : (
              <button
                onClick={() => setShowTaskModal(true)}
                className="btn-primary"
              >
                Create your first task
              </button>
            )}
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />
    </div>
  );
};

export default Tasks;
