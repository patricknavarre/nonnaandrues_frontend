import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, navigation, siteName }) => {
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
    <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex flex-col overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-southern-beige">
        <h2 className="text-xl font-heading font-semibold text-southern-brown">
          {siteName}
        </h2>
        <button
          onClick={onClose}
          className="p-1 text-southern-brown"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-6 space-y-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block text-xl font-medium text-gray-700 hover:text-southern-brown transition-colors"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}

        <div className="border-t border-southern-beige pt-6 space-y-6">
          <Link
            to="/login"
            className="block text-xl font-medium text-gray-700 hover:text-southern-brown transition-colors"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="block text-xl font-medium text-gray-700 hover:text-southern-brown transition-colors"
            onClick={onClose}
          >
            Create Account
          </Link>
        </div>
      </nav>

      <div className="p-6 border-t border-southern-beige">
        <Link to="/cart" className="btn btn-primary w-full" onClick={onClose}>
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
