import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthStatus } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { user, isAuthenticated, loading, error, success } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/admin";

  // Reset auth status when component mounts
  useEffect(() => {
    console.log("Login page mounted. Auth state:", {
      isAuthenticated,
      user,
      error,
      success,
    });
    // Make sure to clear any existing errors when mounting the component
    dispatch(resetAuthStatus());

    // Cleanup function to ensure errors are reset when unmounting
    return () => {
      dispatch(resetAuthStatus());
    };
  }, []); // Only run on mount and unmount

  useEffect(() => {
    // If user is already logged in as admin, redirect
    if (isAuthenticated && user && user.role === "admin") {
      console.log("Admin is authenticated. Redirecting to:", redirect);
      navigate(redirect);
    }
  }, [navigate, isAuthenticated, user, redirect]);

  useEffect(() => {
    // Show error toast if login fails
    if (error) {
      console.error("Login error:", error);
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    // Show success toast if login succeeds
    if (success && isAuthenticated) {
      console.log("Login success!");
      toast.success("Admin login successful!");
    }
  }, [success, isAuthenticated]);

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
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-southern-green">
          Home
        </Link>
        <ChevronRight className="mx-1" size={16} />
        <span className="font-medium text-southern-brown">Admin Login</span>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-southern shadow-md p-8">
        <h1 className="text-3xl font-heading font-bold text-southern-brown mb-6 text-center">
          Admin Login
        </h1>

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

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            This login is for store administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
