import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthStatus } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const AdminLoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, error, success } = useSelector((state) => state.auth);

  // Reset auth status when component mounts
  useEffect(() => {
    dispatch(resetAuthStatus());
    return () => {
      dispatch(resetAuthStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    // Show error toast if login fails
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    // Show success toast if login succeeds
    if (success) {
      toast.success("Admin login successful!");
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log("Attempting admin login with:", formData.email);

    // Dispatch login action
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-southern-cream flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-southern shadow-md p-8">
        <h1 className="text-3xl font-heading font-bold text-southern-brown mb-6 text-center">
          Admin Login
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please sign in to access the admin dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-southern-green focus:ring-southern-green border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mb-4"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In as Admin"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-southern-green hover:underline">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
