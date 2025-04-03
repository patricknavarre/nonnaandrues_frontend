import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Palette,
  FileText,
  Tag,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { logout } from "../../slices/authSlice";
import { toast } from "react-hot-toast";

const AdminLayout = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Check if current route matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Appearance", href: "/admin/appearance", icon: Palette },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Logo" className="h-8 w-auto" />
            <span className="font-heading font-bold text-southern-brown text-lg">
              Admin Panel
            </span>
          </Link>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-southern text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-southern-green/10 text-southern-green"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.href)
                      ? "text-southern-green"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-southern-beige flex items-center justify-center">
                <span className="text-southern-brown font-medium">
                  {userInfo?.firstName?.[0] || "A"}
                  {userInfo?.lastName?.[0] || "U"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-700">
                {userInfo?.firstName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : "Admin User"}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-xs font-medium text-southern-green hover:underline"
              >
                <LogOut size={14} className="mr-1" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-southern text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>

        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-heading font-bold text-southern-brown">
              {title}
            </h1>

            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <Bell size={20} aria-hidden="true" />
              </button>
              <div className="hidden md:flex md:items-center md:ml-4">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-southern-beige flex items-center justify-center">
                      <span className="text-southern-brown font-medium text-sm">
                        {userInfo?.firstName?.[0] || "A"}
                        {userInfo?.lastName?.[0] || "U"}
                      </span>
                    </div>
                    <span className="hidden md:inline-flex ml-2 text-sm font-medium text-gray-700">
                      {userInfo?.firstName
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : "Admin User"}
                    </span>
                    <ChevronDown
                      size={16}
                      className="ml-1 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
