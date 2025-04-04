import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { User, ShoppingBag, CreditCard, Package } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(getUserProfile());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: <User className="w-5 h-5 mr-2" />,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <ShoppingBag className="w-5 h-5 mr-2" />,
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: <CreditCard className="w-5 h-5 mr-2" />,
    },
    {
      id: "address",
      label: "Shipping Addresses",
      icon: <Package className="w-5 h-5 mr-2" />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white rounded-southern shadow p-6">
            <h2 className="text-2xl font-heading font-bold text-southern-brown mb-6">
              Personal Information
            </h2>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-800 font-medium">
                    {user?.name || "Not available"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-800 font-medium">
                    {user?.email || "Not available"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Account Type
                  </label>
                  <p className="text-lg text-gray-800 font-medium">
                    {user?.role === "admin" ? "Administrator" : "Customer"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </label>
                  <p className="text-lg text-gray-800 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div className="pt-4">
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            )}
          </div>
        );
      case "orders":
        return (
          <div className="bg-white rounded-southern shadow p-6">
            <h2 className="text-2xl font-heading font-bold text-southern-brown mb-6">
              Order History
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                You haven't placed any orders yet. Browse our products and place
                your first order today!
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="btn btn-primary"
              >
                Start Shopping
              </button>
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="bg-white rounded-southern shadow p-6">
            <h2 className="text-2xl font-heading font-bold text-southern-brown mb-6">
              Payment Methods
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No payment methods saved
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                You haven't saved any payment methods yet. Add a payment method
                for faster checkout.
              </p>
              <button className="btn btn-primary">Add Payment Method</button>
            </div>
          </div>
        );
      case "address":
        return (
          <div className="bg-white rounded-southern shadow p-6">
            <h2 className="text-2xl font-heading font-bold text-southern-brown mb-6">
              Shipping Addresses
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No addresses saved
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                You haven't saved any shipping addresses yet. Add an address for
                faster checkout.
              </p>
              <button className="btn btn-primary">Add Address</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-southern-brown mb-8">
        My Account
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-southern shadow p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left transition ${
                    activeTab === tab.id
                      ? "bg-southern-green/10 text-southern-green font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
