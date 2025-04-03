import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  LayoutDashboard, 
  Package, 
  Paintbrush, 
  Settings, 
  Home, 
  LogOut 
} from "lucide-react";

const AdminLayout = () => {
  const { config } = useSelector((state) => state.site);
  const location = useLocation();

  // Navigation items for the admin sidebar
  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { path: "/admin/appearance", label: "Appearance", icon: <Paintbrush size={20} /> },
    { path: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
    { path: "/", label: "Back to Site", icon: <Home size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-southern-brown text-white">
        <div className="p-4 border-b border-southern-brown-dark">
          <Link to="/admin" className="flex items-center gap-2">
            <img 
              src={config?.logo?.url || "/logo-placeholder.svg"} 
              alt={config?.logo?.alt || "Admin Panel"} 
              className="h-8 w-auto"
            />
            <span className="font-heading text-lg font-semibold">Admin</span>
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-southern-green text-white"
                      : "hover:bg-southern-brown-dark"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="mt-8 pt-4 border-t border-southern-brown-dark">
              <button className="flex items-center gap-2 p-2 rounded-md w-full hover:bg-southern-brown-dark">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 