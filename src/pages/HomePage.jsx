import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, ChevronRight } from "lucide-react";
import shopifyService from "../services/shopifyService";

const HomePage = () => {
  const { config = {} } = useSelector((state) => state.site || {});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create a safe config object with default values
  const safeConfig = {
    siteName: "Nonna & Rue's",
    heroSection: {
      title: "Welcome to Southern Charm",
      subtitle: "Handcrafted products with Southern hospitality",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    aboutSection: {
      title: "Our Story",
      content:
        "Southern Charm is a celebration of the gracious lifestyle and timeless elegance of the American South. Our carefully curated collection brings that warm, inviting spirit into your home.",
    },
    ...config,
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await shopifyService.getProducts({
          limit: 4,
          featured: true,
        });
        setFeaturedProducts(response.products || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage: safeConfig.heroSection?.backgroundImage?.url
            ? `url(${safeConfig.heroSection.backgroundImage.url})`
            : 'url("/images/hero-default.jpg")',
          backgroundColor: "#f9f7f3",
        }}
      >
        <div className="absolute inset-0 bg-southern-brown/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 drop-shadow-md">
            {safeConfig.heroSection.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            {safeConfig.heroSection.subtitle}
          </p>
          <Link
            to={safeConfig.heroSection.buttonLink}
            className="btn btn-primary text-base px-8 py-3"
          >
            {safeConfig.heroSection.buttonText}
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-southern-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Shop Our Collections</h2>
          <p className="section-subtitle text-center mx-auto">
            Discover our handpicked selections representing the finest of
            Southern style
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {(
              safeConfig.featuredCategories || [
                {
                  name: "Home Decor",
                  image: { url: "/images/category-decor.jpg" },
                  link: "/products?category=home-decor",
                },
                {
                  name: "Kitchenware",
                  image: { url: "/images/category-kitchen.jpg" },
                  link: "/products?category=kitchenware",
                },
                {
                  name: "Gifts",
                  image: { url: "/images/category-gifts.jpg" },
                  link: "/products?category=gifts",
                },
              ]
            ).map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="card group overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                  <div className="w-full h-64 bg-southern-beige/30 flex items-center justify-center">
                    {category.image?.url ? (
                      <img
                        src={category.image.url}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-southern-brown opacity-50 text-lg">
                        Image Placeholder
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-southern-brown mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  )}
                  <div className="flex items-center text-southern-green font-medium">
                    Shop Now <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white southern-border-t">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Featured Products</h2>
          <p className="section-subtitle text-center mx-auto">
            Our most popular items, handpicked with Southern grace
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {isLoading ? (
              // Loading placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="w-full h-64 bg-southern-beige/30"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-southern-beige/50 rounded w-3/4"></div>
                    <div className="h-4 bg-southern-beige/30 rounded"></div>
                    <div className="h-6 bg-southern-beige/40 rounded w-1/4 mt-4"></div>
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="card group hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-southern-beige/10">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.title}
                        className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center text-southern-brown/30">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-southern-brown mb-2 group-hover:text-southern-green transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">
                  No featured products found
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn btn-outline inline-flex items-center"
            >
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-southern-bg-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">{safeConfig.aboutSection.title}</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">{safeConfig.aboutSection.content}</p>
                <p>
                  From handcrafted furniture to unique home accents, each piece
                  in our collection reflects the rich heritage and craftsmanship
                  that defines Southern living.
                </p>
              </div>
              <Link to="/about" className="btn btn-secondary mt-8">
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              {safeConfig.aboutSection?.image?.url ? (
                <img
                  src={safeConfig.aboutSection.image.url}
                  alt={
                    safeConfig.aboutSection.image.alt || "About Southern Charm"
                  }
                  className="rounded-southern shadow-southern"
                />
              ) : (
                <div className="bg-southern-beige/20 rounded-southern h-96 flex items-center justify-center text-southern-brown/50">
                  About Image Placeholder
                </div>
              )}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-southern-green rounded-full hidden md:flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">
                  Since
                  <br />
                  2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-southern-beige/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-semibold text-southern-brown mb-4">
            Join the Southern Charm Family
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            a dash of Southern hospitality delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="input flex-grow"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
