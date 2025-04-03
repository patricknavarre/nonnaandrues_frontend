import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
// No need for a separate comment about missing Pinterest icon since we're using Heart

const Footer = ({ config }) => {
  // Default footer columns if not set in CMS
  const defaultColumns = [
    {
      title: "Shop",
      links: [
        { text: "All Products", url: "/products" },
        { text: "Home Decor", url: "/products?category=home-decor" },
        { text: "Kitchenware", url: "/products?category=kitchenware" },
        { text: "Furniture", url: "/products?category=furniture" },
        { text: "Gifts", url: "/products?category=gifts" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "Our Story", url: "/about" },
        { text: "Contact Us", url: "/contact" },
        { text: "FAQ", url: "/faq" },
        { text: "Shipping Policy", url: "/shipping" },
        { text: "Return Policy", url: "/returns" },
      ],
    },
    {
      title: "Account",
      links: [
        { text: "Sign In", url: "/login" },
        { text: "Register", url: "/register" },
        { text: "Order Tracking", url: "/orders" },
        { text: "Wishlist", url: "/wishlist" },
      ],
    },
  ];

  const footerColumns =
    config.footer?.columns?.length > 0 ? config.footer.columns : defaultColumns;

  const showSocialLinks = config.footer?.showSocialLinks !== false;
  const socialLinks = config.footer?.socialLinks || {};

  return (
    <footer className="bg-southern-beige/30 border-t border-southern-beige">
      <div className="container mx-auto px-4 py-12">
        {/* Footer top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and about section */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              {config.logo && config.logo.url ? (
                <img
                  src={config.logo.url}
                  alt={config.logo.alt || config.siteName}
                  className="h-12"
                />
              ) : (
                <h2 className="text-2xl font-heading font-bold text-southern-brown">
                  {config.siteName}
                </h2>
              )}
            </Link>
            <p className="text-gray-600 mb-4 text-sm">
              {config.aboutSection?.content ||
                "Bringing the warm, gracious lifestyle of the American South to your home with handcrafted products and Southern hospitality."}
            </p>

            {/* Social links */}
            {showSocialLinks && (
              <div className="flex space-x-4 mt-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-southern-brown hover:text-southern-green transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-southern-brown hover:text-southern-green transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {socialLinks.pinterest && (
                  <a
                    href={socialLinks.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-southern-brown hover:text-southern-green transition-colors"
                    aria-label="Pinterest"
                  >
                    <Heart size={20} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-southern-brown hover:text-southern-green transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {/* If no social links are set, show default buttons */}
                {!Object.values(socialLinks).some(Boolean) && (
                  <>
                    <button
                      className="text-southern-brown hover:text-southern-green transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </button>
                    <button
                      className="text-southern-brown hover:text-southern-green transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </button>
                    <button
                      className="text-southern-brown hover:text-southern-green transition-colors"
                      aria-label="Pinterest"
                    >
                      <Heart size={20} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer columns */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-heading font-semibold text-southern-brown mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-gray-600 hover:text-southern-brown transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom with copyright */}
        <div className="mt-12 pt-8 border-t border-southern-beige text-center text-sm text-gray-600">
          <p>
            {config.footer?.copyrightText ||
              `© ${new Date().getFullYear()} ${
                config.siteName
              }. All rights reserved.`}
          </p>
          <p className="mt-2">Designed with Southern charm and hospitality.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
