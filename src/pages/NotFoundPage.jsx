import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const { config } = useSelector((state) => state.site);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        {/* 404 Icon/Image */}
        <div className="mb-8">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <circle
              cx="90"
              cy="90"
              r="88"
              fill="#FDF7EF"
              stroke="#8D7B68"
              strokeWidth="4"
            />
            <path
              d="M54.768 68.296V111H40.716V83.06L32.164 111H21.288L12.736 83.06V111H4V68.296H21.288L31.624 96.956L41.96 68.296H54.768ZM68.4589 111H59.9069V68.296H68.4589V111ZM108.29 68.296V76.54H94.9419V111H86.3899V76.54H73.0419V68.296H108.29ZM129.732 111.54C126.452 111.54 123.48 110.908 120.816 109.644C118.152 108.348 116.04 106.516 114.48 104.148C112.952 101.78 112.188 99.02 112.188 95.868C112.188 92.716 112.952 89.956 114.48 87.588C116.04 85.22 118.152 83.404 120.816 82.14C123.48 80.844 126.452 80.196 129.732 80.196C133.012 80.196 135.984 80.844 138.648 82.14C141.312 83.404 143.408 85.22 144.936 87.588C146.496 89.956 147.276 92.716 147.276 95.868C147.276 99.02 146.496 101.78 144.936 104.148C143.408 106.516 141.312 108.348 138.648 109.644C135.984 110.908 133.012 111.54 129.732 111.54ZM129.732 103.608C132.332 103.608 134.436 102.764 136.044 101.076C137.652 99.356 138.456 97.052 138.456 95.164C138.456 93.244 137.652 90.94 136.044 89.252C134.436 87.532 132.332 86.672 129.732 86.672C127.132 86.672 125.028 87.532 123.42 89.252C121.812 90.94 121.008 93.244 121.008 95.164C121.008 97.052 121.812 99.356 123.42 101.076C125.028 102.764 127.132 103.608 129.732 103.608ZM172.87 80.736V111H164.318V97.172H153.334V111H144.782V80.736H153.334V90.1H164.318V80.736H172.87Z"
              fill="#8D7B68"
            />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-heading font-bold text-southern-brown mb-6">
          Page Not Found
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          We're sorry, but it seems the page you're looking for has vanished
          like a rare vintage find. It might have been moved or doesn't exist
          anymore.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn btn-primary flex items-center gap-2">
            <ArrowLeft size={18} />
            Return Home
          </Link>

          <Link to="/products" className="btn btn-outline-secondary">
            Browse Our Collection
          </Link>
        </div>

        <div className="mt-14 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-heading font-semibold text-southern-brown mb-6">
            You Might Be Looking For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium text-southern-brown mb-2">
                Popular Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products/category/furniture"
                    className="text-southern-green hover:underline"
                  >
                    Vintage Furniture
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/category/home-decor"
                    className="text-southern-green hover:underline"
                  >
                    Home Decor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/category/collectibles"
                    className="text-southern-green hover:underline"
                  >
                    Collectibles
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center p-4">
              <h3 className="text-lg font-medium text-southern-brown mb-2">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-southern-green hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-southern-green hover:underline"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-southern-green hover:underline"
                  >
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center p-4">
              <h3 className="text-lg font-medium text-southern-brown mb-2">
                About Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-southern-green hover:underline"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-southern-green hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-southern-green hover:underline"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
