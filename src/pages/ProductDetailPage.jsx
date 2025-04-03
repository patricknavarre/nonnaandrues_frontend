import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Plus, Minus, Heart, Share2 } from "lucide-react";
import { fetchProductById } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);
  const { config } = useSelector((state) => state.site);

  // Local state
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        await dispatch(fetchProductById(id)).unwrap();
      } catch (err) {
        toast.error(err || "Failed to load product");
      }
    };

    loadProduct();
  }, [dispatch, id]);

  // Set selected variant and main image when product loads
  useEffect(() => {
    if (product) {
      // Select first variant by default
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }

      // Set main image
      if (product.images && product.images.length > 0) {
        setMainImage(product.images[0].url);
      }
    }
  }, [product]);

  // Handle variant change
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);

    // If variant has an image, update the main image
    if (variant.image) {
      setMainImage(variant.image.url);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    try {
      const cartItem = {
        id: selectedVariant.id,
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        price: selectedVariant.price || product.price,
        image: product.images?.[0]?.url || "",
        quantity: quantity,
      };

      dispatch(addToCart(cartItem));
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-southern bg-southern-beige/20 h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-southern-beige/30 rounded w-3/4"></div>
              <div className="h-6 bg-southern-beige/30 rounded w-1/2"></div>
              <div className="h-16 bg-southern-beige/20 rounded w-full"></div>
              <div className="h-10 bg-southern-beige/30 rounded w-1/4"></div>
              <div className="h-12 bg-southern-beige/20 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-southern-brown mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-southern-brown mb-4">
            Product not found
          </h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-southern-cream min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-southern-brown hover:text-southern-green mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product images */}
          <div>
            {/* Main image */}
            <div className="bg-white rounded-southern overflow-hidden mb-4">
              <img
                src={mainImage || "/images/placeholder.png"}
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* Image thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(image.url)}
                    className={`bg-white rounded-southern overflow-hidden border-2 ${
                      mainImage === image.url
                        ? "border-southern-green"
                        : "border-southern-beige"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.title} - view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-southern-brown mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-2xl text-southern-green font-semibold mb-6">
              ${(selectedVariant?.price || product.price || 0).toFixed(2)}
            </p>

            {/* Description */}
            <div className="prose prose-sm mb-6 text-gray-700">
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-southern-brown mb-2">
                  Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`px-4 py-2 rounded-southern border ${
                        selectedVariant?.id === variant.id
                          ? "bg-southern-green text-white border-southern-green"
                          : "bg-white border-southern-beige hover:border-southern-green"
                      }`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-southern-brown mb-2">
                Quantity
              </h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-l-southern bg-southern-beige/50 text-southern-brown disabled:opacity-50"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-16 p-2 text-center border-y border-southern-beige/50 bg-white"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-r-southern bg-southern-beige/50 text-southern-brown"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary py-3 flex-1"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button className="btn btn-outline py-3">
                <Heart size={18} className="mr-2" />
                Save
              </button>

              <button className="btn btn-outline py-3">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>

            {/* Product details accordion */}
            <div className="border-t border-southern-beige mt-8 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-southern-brown mb-2">
                  Shipping
                </h3>
                <p className="text-gray-600 text-sm">
                  Free shipping on orders over $50. Standard delivery 3-5
                  business days.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-southern-brown mb-2">
                  Returns
                </h3>
                <p className="text-gray-600 text-sm">
                  30-day return policy. See our{" "}
                  <Link to="/returns" className="text-southern-green underline">
                    return policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products would go here */}
    </div>
  );
};

export default ProductDetailPage;
