import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filter, X, LayoutGrid, LayoutPanelTop } from "lucide-react";
import shopifyService from "../services/shopifyService";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns

  // Parse current filters from URL
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Filter and sort states
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);

  // Update URL when filters change
  const updateFilters = (filters) => {
    const params = new URLSearchParams(location.search);

    // Update or remove each filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Update URL
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPageState(1);
    updateFilters({
      category,
      page: 1,
    });
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    updateFilters({ sort });
  };

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    updateFilters({ page });
  };

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Build query params
        const queryParams = {
          limit: 12,
          page: currentPageState,
        };

        if (selectedCategory) {
          queryParams.category = selectedCategory;
        }

        // Add sort parameter
        switch (selectedSort) {
          case "price-low":
            queryParams.sort = "price";
            break;
          case "price-high":
            queryParams.sort = "-price";
            break;
          case "oldest":
            queryParams.sort = "createdAt";
            break;
          case "newest":
          default:
            queryParams.sort = "-createdAt";
            break;
        }

        const response = await shopifyService.getProducts(queryParams);
        setProducts(response.products || []);
        setTotalPages(response.totalPages || 1);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSort, currentPageState]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await shopifyService.getCollections();
        setCategories(response.collections || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Toggle mobile filter panel
  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  // Build pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      currentPageState - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page when we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-southern hover:bg-southern-beige/50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }
    }

    // Add main pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-southern ${
            i === currentPageState
              ? "bg-southern-brown text-white"
              : "hover:bg-southern-beige/50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-southern hover:bg-southern-beige/50"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPageState - 1))}
          disabled={currentPageState === 1}
          className="px-3 py-1 rounded-southern hover:bg-southern-beige/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {pages}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPageState + 1))
          }
          disabled={currentPageState === totalPages}
          className="px-3 py-1 rounded-southern hover:bg-southern-beige/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="bg-southern-cream min-h-screen">
      {/* Page header */}
      <div className="bg-southern-brown/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-southern-brown mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handcrafted products that bring the warm hospitality and
            timeless elegance of the South into your home.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <button
            onClick={toggleMobileFilter}
            className="btn btn-outline flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Filter & Sort
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 rounded-southern ${
                gridCols === 3 ? "bg-southern-beige" : ""
              }`}
              aria-label="3 columns"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 rounded-southern ${
                gridCols === 4 ? "bg-southern-beige" : ""
              }`}
              aria-label="4 columns"
            >
              <LayoutPanelTop size={16} />
            </button>
          </div>
        </div>

        {/* Mobile filter panel */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-white p-4 overflow-auto md:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-semibold text-southern-brown">
                Filter & Sort
              </h2>
              <button
                onClick={toggleMobileFilter}
                className="p-2 text-gray-500"
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`block w-full text-left px-3 py-2 rounded-southern ${
                    selectedCategory === ""
                      ? "bg-southern-beige"
                      : "hover:bg-southern-beige/30"
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.handle)}
                    className={`block w-full text-left px-3 py-2 rounded-southern ${
                      selectedCategory === category.handle
                        ? "bg-southern-beige"
                        : "hover:bg-southern-beige/30"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`block w-full text-left px-3 py-2 rounded-southern ${
                      selectedSort === option.value
                        ? "bg-southern-beige"
                        : "hover:bg-southern-beige/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={toggleMobileFilter}
              className="btn btn-primary w-full mt-4"
            >
              Apply Filters
            </button>
          </div>
        )}

        <div className="flex flex-wrap md:flex-nowrap">
          {/* Sidebar filters - desktop */}
          <div className="hidden md:block w-64 pr-8">
            <div className="mb-8">
              <h3 className="text-lg font-heading font-semibold text-southern-brown mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`block w-full text-left px-3 py-2 rounded-southern text-gray-700 ${
                    selectedCategory === ""
                      ? "bg-southern-beige"
                      : "hover:bg-southern-beige/30"
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.handle)}
                    className={`block w-full text-left px-3 py-2 rounded-southern text-gray-700 ${
                      selectedCategory === category.handle
                        ? "bg-southern-beige"
                        : "hover:bg-southern-beige/30"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full">
            {/* Desktop toolbar */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input py-1 px-3"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-southern ${
                    gridCols === 3 ? "bg-southern-beige" : ""
                  }`}
                  aria-label="3 columns"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-southern ${
                    gridCols === 4 ? "bg-southern-beige" : ""
                  }`}
                  aria-label="4 columns"
                >
                  <LayoutPanelTop size={16} />
                </button>
              </div>
            </div>

            {/* Results count */}
            <p className="text-gray-600 mb-6">
              {isLoading
                ? "Loading products..."
                : `Showing ${products.length} products${
                    selectedCategory ? ` in ${selectedCategory}` : ""
                  }`}
            </p>

            {/* Products grid */}
            {isLoading ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} gap-6`}
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="card animate-pulse">
                    <div className="w-full h-64 bg-southern-beige/30"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-southern-beige/50 rounded w-3/4"></div>
                      <div className="h-4 bg-southern-beige/30 rounded"></div>
                      <div className="h-6 bg-southern-beige/40 rounded w-1/4 mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } gap-6`}
              >
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="card group hover:shadow-lg transition-shadow h-full flex flex-col"
                  >
                    <div className="relative pt-[100%] overflow-hidden bg-southern-beige/10">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt || product.title}
                          className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-southern-brown/30">
                          No Image Available
                        </div>
                      )}
                      {product.stock <= 0 && (
                        <div className="absolute top-2 right-2 bg-southern-rust text-white text-xs font-bold px-2 py-1 rounded">
                          Sold Out
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-heading font-semibold text-southern-brown mb-2 group-hover:text-southern-green transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                      <p className="text-lg font-semibold text-southern-green">
                        $
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-southern border border-southern-beige">
                <p className="text-lg text-gray-500 mb-4">No products found</p>
                <button
                  onClick={() => handleCategoryChange("")}
                  className="btn btn-outline"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
