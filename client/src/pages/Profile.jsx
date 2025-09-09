import { useState } from "react";
import { User, Mail, Calendar, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await updateProfile(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Joined{" "}
                {user?.createdAt &&
                  format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Profile Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      className="input-field pl-10"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <LoadingSpinner size="small" className="mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Tasks</span>
                <span className="text-sm font-medium text-gray-900">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed Tasks</span>
                <span className="text-sm font-medium text-green-600">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Tasks</span>
                <span className="text-sm font-medium text-yellow-600">--</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Export My Tasks
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Download Data
              </button>
              <button className="w-full text-left text-sm text-red-600 hover:text-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
