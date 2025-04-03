import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminProducts = () => {
  // State for products, pagination, filtering and sorting
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([
    "All Categories",
    "Furniture",
    "Home Decor",
    "Collectibles",
    "Tableware",
    "Textiles",
    "Artwork",
    "Lighting",
  ]);

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Mock API response with sample data
        const mockProducts = generateMockProducts();

        // Apply filters
        let filteredProducts = [...mockProducts];

        if (searchTerm) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.sku.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (filterCategory && filterCategory !== "All Categories") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filterCategory
          );
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
          if (sortField === "price") {
            return sortDirection === "asc"
              ? a.price - b.price
              : b.price - a.price;
          } else if (sortField === "name") {
            return sortDirection === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortField === "stock") {
            return sortDirection === "asc"
              ? a.stock - b.stock
              : b.stock - a.stock;
          } else {
            // Default sort by createdAt
            return sortDirection === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt);
          }
        });

        // Calculate pagination
        const itemsPerPage = 10;
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        setTotalPages(totalPages);

        // Get current page items
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProducts = filteredProducts.slice(
          startIndex,
          startIndex + itemsPerPage
        );

        setProducts(paginatedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, filterCategory, sortField, sortDirection]);

  // Generate mock product data
  const generateMockProducts = () => {
    const mockProducts = [];
    const categories = [
      "Furniture",
      "Home Decor",
      "Collectibles",
      "Tableware",
      "Textiles",
      "Artwork",
      "Lighting",
    ];
    const status = ["In Stock", "Low Stock", "Out of Stock"];

    for (let i = 1; i <= 50; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const stockStatus = status[Math.floor(Math.random() * status.length)];
      const stock =
        stockStatus === "In Stock"
          ? Math.floor(Math.random() * 30) + 10
          : stockStatus === "Low Stock"
          ? Math.floor(Math.random() * 10) + 1
          : 0;

      mockProducts.push({
        id: `PRD-${i.toString().padStart(4, "0")}`,
        sku: `SKU-${i.toString().padStart(4, "0")}`,
        name: `Vintage ${category} Item ${i}`,
        price: parseFloat((Math.random() * 500 + 20).toFixed(2)),
        category,
        stock,
        status: stockStatus,
        thumbnail: `/images/products/${(i % 8) + 1}.jpg`,
        featured: Math.random() > 0.8,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }

    return mockProducts;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in the useEffect
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDeleteClick = (product = null) => {
    if (product) {
      // Single product delete
      setProductToDelete(product);
    } else if (selectedProducts.length > 0) {
      // Bulk delete
      setProductToDelete({ id: selectedProducts, isBulk: true });
    } else {
      return; // Don't open modal if nothing selected
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    try {
      if (productToDelete.isBulk) {
        // Bulk delete logic
        setProducts(
          products.filter((product) => !productToDelete.id.includes(product.id))
        );
        toast.success(
          `${productToDelete.id.length} products deleted successfully`
        );
        setSelectedProducts([]);
      } else {
        // Single product delete logic
        setProducts(
          products.filter((product) => product.id !== productToDelete.id)
        );
        toast.success(`Product ${productToDelete.name} deleted successfully`);
      }
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product(s):", error);
      toast.error("Failed to delete product(s)");
    }
  };

  return (
    <AdminLayout title="Products">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/products/new"
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </Link>

          {selectedProducts.length > 0 && (
            <button
              onClick={() => handleDeleteClick()}
              className="btn btn-outline-danger flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Delete Selected</span>
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </form>

          <div className="relative">
            <select
              className="w-full sm:w-40 appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent bg-white"
              value={filterCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-southern shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={
                      products.length > 0 &&
                      selectedProducts.length === products.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort("name")}
                  >
                    <span>Product</span>
                    <ArrowUpDown
                      size={14}
                      className={
                        sortField === "name"
                          ? "text-southern-brown"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort("price")}
                  >
                    <span>Price</span>
                    <ArrowUpDown
                      size={14}
                      className={
                        sortField === "price"
                          ? "text-southern-brown"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort("stock")}
                  >
                    <span>Stock</span>
                    <ArrowUpDown
                      size={14}
                      className={
                        sortField === "stock"
                          ? "text-southern-brown"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Loading state
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-4 py-4">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-8 w-24 bg-gray-200 rounded ml-auto"></div>
                      </td>
                    </tr>
                  ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <img
                        src={
                          product.thumbnail || "/images/placeholder-product.jpg"
                        }
                        alt={product.name}
                        className="h-12 w-12 rounded-southern object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "/images/placeholder-product.jpg";
                        }}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-southern-brown">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sku}
                        {product.featured && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-southern-beige text-southern-brown">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium space-x-2 whitespace-nowrap">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View product"
                      >
                        <Eye size={18} className="inline" />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-southern-green hover:text-southern-green-dark"
                        title="Edit product"
                      >
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete product"
                      >
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <AlertTriangle size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm">
                        Try adjusting your search or filter to find what you're
                        looking for
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-southern-b sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * 10 + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * 10,
                    products.length + (currentPage - 1) * 10
                  )}
                </span>{" "}
                {searchTerm || filterCategory
                  ? "of filtered results"
                  : "of all products"}
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-southern shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-southern px-2 py-2 text-gray-400 ${
                    currentPage === 1
                      ? "bg-gray-100 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show current page, first, last, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === pageNumber
                            ? "z-10 bg-southern-beige text-southern-brown focus:z-20"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 &&
                      currentPage < totalPages - 2)
                  ) {
                    // Show ellipsis for skipped pages
                    return (
                      <span
                        key={pageNumber}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-southern px-2 py-2 text-gray-400 ${
                    currentPage === totalPages
                      ? "bg-gray-100 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-southern p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {productToDelete && productToDelete.isBulk
                  ? `Delete ${productToDelete.id.length} products?`
                  : `Delete "${productToDelete && productToDelete.name}"`}
              </h3>
              <p className="text-sm text-gray-500">
                {productToDelete && productToDelete.isBulk
                  ? "Are you sure you want to delete the selected products? This action cannot be undone."
                  : "Are you sure you want to delete this product? This action cannot be undone."}
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
