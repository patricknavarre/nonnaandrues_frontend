import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, LogOut } from "lucide-react";

const MobileMenu = ({
  isOpen,
  onClose,
  navigation,
  siteName,
  isAuthenticated,
  isAdmin,
  onLogout,
}) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-southern-brown">
            {siteName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-southern-brown"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 text-xl font-medium text-southern-brown hover:text-southern-green transition-colors"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin section - only visible when admin is logged in */}
          {isAuthenticated && isAdmin && (
            <div className="pt-6 border-t border-gray-200">
              <div className="space-y-4">
                <Link
                  to="/admin"
                  className="block py-2 text-lg font-medium text-southern-brown hover:text-southern-green transition-colors"
                  onClick={onClose}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex items-center py-2 text-lg font-medium text-southern-brown hover:text-southern-green transition-colors"
                >
                  <LogOut size={20} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
