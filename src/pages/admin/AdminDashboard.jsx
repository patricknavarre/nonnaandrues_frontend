import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Truck,
  Calendar,
} from "lucide-react";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    revenue: { total: 15482.67, change: 12.3 },
    orders: { total: 126, change: 8.5 },
    customers: { total: 843, change: 5.2 },
    products: { total: 158, change: -2.4 },
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch dashboard data
    const fetchDashboardData = () => {
      // In a real app, we would make API calls here
      setRecentOrders([
        {
          id: "ORD-9384",
          customer: "Emma Johnson",
          date: "Jun 12, 2023",
          amount: 142.99,
          status: "completed",
        },
        {
          id: "ORD-9383",
          customer: "Michael Smith",
          date: "Jun 11, 2023",
          amount: 265.5,
          status: "processing",
        },
        {
          id: "ORD-9382",
          customer: "Sophia Davis",
          date: "Jun 10, 2023",
          amount: 89.99,
          status: "completed",
        },
        {
          id: "ORD-9381",
          customer: "James Wilson",
          date: "Jun 10, 2023",
          amount: 175.25,
          status: "shipped",
        },
        {
          id: "ORD-9380",
          customer: "Olivia Brown",
          date: "Jun 9, 2023",
          amount: 320.75,
          status: "completed",
        },
      ]);

      setTopProducts([
        {
          id: "PRD-1234",
          name: "Vintage Wooden Side Table",
          sales: 24,
          revenue: 2880.0,
          stock: 8,
        },
        {
          id: "PRD-5678",
          name: "Antique Brass Lamp",
          sales: 18,
          revenue: 1890.0,
          stock: 12,
        },
        {
          id: "PRD-9012",
          name: "Hand-Painted Ceramic Vase",
          sales: 15,
          revenue: 1125.0,
          stock: 5,
        },
        {
          id: "PRD-3456",
          name: "Vintage Glass Decanter Set",
          sales: 12,
          revenue: 960.0,
          stock: 3,
        },
        {
          id: "PRD-7890",
          name: "Restored Art Deco Chair",
          sales: 10,
          revenue: 2490.0,
          stock: 2,
        },
      ]);
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white rounded-southern p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <div className="p-2 bg-southern-green/10 rounded-full">
              <DollarSign size={20} className="text-southern-green" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">
              ${stats.revenue.total.toLocaleString()}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                stats.revenue.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.revenue.change >= 0 ? "+" : ""}
              {stats.revenue.change}%
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last month</p>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-southern p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <div className="p-2 bg-southern-brown/10 rounded-full">
              <ShoppingBag size={20} className="text-southern-brown" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">
              {stats.orders.total}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                stats.orders.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.orders.change >= 0 ? "+" : ""}
              {stats.orders.change}%
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last month</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white rounded-southern p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Customers
            </h3>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">
              {stats.customers.total}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                stats.customers.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.customers.change >= 0 ? "+" : ""}
              {stats.customers.change}%
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last month</p>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-southern p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Active Products
            </h3>
            <div className="p-2 bg-amber-100 rounded-full">
              <Package size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">
              {stats.products.total}
            </span>
            <span
              className={`ml-2 text-sm font-medium ${
                stats.products.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.products.change >= 0 ? "+" : ""}
              {stats.products.change}%
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-southern shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">Revenue Overview</h3>
            <select className="text-sm border border-gray-300 rounded-southern px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-20" />
              <p>Revenue chart will be displayed here</p>
              <p className="text-xs">
                Integration with charts library required (Recharts, Chart.js)
              </p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-southern shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-700 font-medium">Order Status</h3>
            <button className="text-southern-green text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">
                  Processing
                </h4>
                <span className="text-sm text-gray-700">28 orders</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "22%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">Shipped</h4>
                <span className="text-sm text-gray-700">35 orders</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "28%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">Delivered</h4>
                <span className="text-sm text-gray-700">54 orders</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "43%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">Cancelled</h4>
                <span className="text-sm text-gray-700">9 orders</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "7%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-southern-brown">126</h4>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-green-600">89%</h4>
              <p className="text-xs text-gray-500">Completion Rate</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-southern-green">
                2.3d
              </h4>
              <p className="text-xs text-gray-500">Avg. Processing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-southern shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-medium">Recent Orders</h3>
              <Link
                to="/admin/orders"
                className="text-southern-green text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-southern-brown">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-southern shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-medium">
                Top Selling Products
              </h3>
              <Link
                to="/admin/products"
                className="text-southern-green text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sales
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-southern-brown">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">{product.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.sales} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${product.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 5
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin/products/new"
          className="bg-white p-6 rounded-southern shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-southern-green/10 mb-4">
            <Package className="text-southern-green" size={24} />
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Add New Product</h3>
          <p className="text-sm text-gray-500">Create a new product listing</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-southern shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-southern-brown/10 mb-4">
            <Truck className="text-southern-brown" size={24} />
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Process Orders</h3>
          <p className="text-sm text-gray-500">Manage pending orders</p>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-white p-6 rounded-southern shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-blue-100 mb-4">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Sales Reports</h3>
          <p className="text-sm text-gray-500">View detailed analytics</p>
        </Link>

        <Link
          to="/admin/calendar"
          className="bg-white p-6 rounded-southern shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
        >
          <div className="p-3 rounded-full bg-amber-100 mb-4">
            <Calendar className="text-amber-600" size={24} />
          </div>
          <h3 className="font-medium text-gray-800 mb-1">Events Calendar</h3>
          <p className="text-sm text-gray-500">Schedule store events</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
