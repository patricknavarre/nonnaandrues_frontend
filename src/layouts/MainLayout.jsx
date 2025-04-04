import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingBag,
  Menu,
  User,
  Search,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { logout } from "../features/auth/authSlice";

// Components
import Footer from "../components/layout/Footer";
import MobileMenu from "../components/layout/MobileMenu";

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { config = {} } = useSelector((state) => state.site || {});
  const { items = [] } = useSelector((state) => state.cart || {});
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Ensure config has all needed properties with defaults
  const safeConfig = {
    siteName: "Nonna & Rue's",
    logo: {},
    ...config,
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className={`w-full transition-all duration-300 z-40 ${
          isScrolled
            ? "sticky top-0 bg-white shadow-md py-2"
            : "bg-southern-cream py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1 text-southern-brown"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            {safeConfig.logo?.url ? (
              <img
                src={safeConfig.logo.url}
                alt={safeConfig.logo.alt || safeConfig.siteName}
                className="h-12 md:h-16"
              />
            ) : (
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-southern-brown">
                {safeConfig.siteName}
              </h1>
            )}
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium ${
                  location.pathname === item.href
                    ? "text-southern-brown border-b-2 border-southern-brown"
                    : "text-gray-700 hover:text-southern-brown hover:border-b-2 hover:border-southern-brown"
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            {/* Admin link if user is admin */}
            {isAuthenticated && user && user.role === "admin" && (
              <Link
                to="/admin"
                className={`text-sm font-medium ${
                  location.pathname.startsWith("/admin")
                    ? "text-southern-brown border-b-2 border-southern-brown"
                    : "text-gray-700 hover:text-southern-brown hover:border-b-2 hover:border-southern-brown"
                } transition-colors duration-200`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right navigation - Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="p-1 text-gray-700 hover:text-southern-brown transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            {/* Admin Access - Only shown when logged in */}
            {isAuthenticated && user?.role === "admin" && (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-southern-brown hover:text-southern-green">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-southern shadow-lg py-2 z-50 hidden group-hover:block">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-southern-green/10 hover:text-southern-green"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-southern-green/10 hover:text-southern-green"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </div>
                  </button>
                </div>
              </div>
            )}

            <Link
              to="/cart"
              className="p-1 text-gray-700 hover:text-southern-brown transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-southern-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        siteName={safeConfig.siteName}
        isAuthenticated={isAuthenticated}
        isAdmin={user?.role === "admin"}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer config={safeConfig} />
    </div>
  );
};

export default MainLayout;
