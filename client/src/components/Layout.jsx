import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import TaskModal from "./TaskModal";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 border-r-2 border-primary-600 text-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:shadow-sm">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        <nav className="flex-1 mt-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 border-r-2 border-primary-600 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-3 text-gray-400 hover:text-gray-500"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">
                {navigation.find((item) => item.href === location.pathname)
                  ?.name || "Dashboard"}
              </h2>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />
    </div>
  );
};

export default Layout;
