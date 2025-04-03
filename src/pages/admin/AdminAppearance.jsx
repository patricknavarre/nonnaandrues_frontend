import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Palette, Check, Undo2 } from "lucide-react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { updateSiteConfig } from "../../features/site/siteSlice";

const AdminAppearance = () => {
  const dispatch = useDispatch();
  const { config, loading } = useSelector((state) => state.site);

  const [formData, setFormData] = useState({
    siteName: "",
    siteTagline: "",
    logo: "",
    favicon: "",
    primaryColor: "#4f7942",
    secondaryColor: "#8d7b68",
    accentColor: "#fdf7ef",
    bannerEnabled: true,
    bannerText: "",
    bannerLink: "",
    footerText: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      pinterest: "",
      twitter: "",
    },
  });

  const [savedState, setSavedState] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Load configuration data
  useEffect(() => {
    if (config) {
      const initialFormData = {
        siteName: config.siteName || "Nonna & Rue's",
        siteTagline: config.siteTagline || "Unique Vintage Finds",
        logo: config.logo || "/images/logo.svg",
        favicon: config.favicon || "/favicon.ico",
        primaryColor: config.colors?.primary || "#4f7942",
        secondaryColor: config.colors?.secondary || "#8d7b68",
        accentColor: config.colors?.accent || "#fdf7ef",
        bannerEnabled: config.banner?.enabled ?? true,
        bannerText: config.banner?.text || "Free shipping on orders over $100",
        bannerLink: config.banner?.link || "/shipping",
        footerText:
          config.footerText || "© 2023 Nonna & Rue's. All rights reserved.",
        socialLinks: {
          facebook:
            config.socialLinks?.facebook || "https://facebook.com/nonnaandrues",
          instagram:
            config.socialLinks?.instagram ||
            "https://instagram.com/nonnaandrues",
          pinterest:
            config.socialLinks?.pinterest ||
            "https://pinterest.com/nonnaandrues",
          twitter:
            config.socialLinks?.twitter || "https://twitter.com/nonnaandrues",
        },
      };

      setFormData(initialFormData);
      setSavedState(initialFormData);
    }
  }, [config]);

  // Check for unsaved changes
  useEffect(() => {
    if (Object.keys(savedState).length > 0) {
      // Convert both objects to strings to compare them
      const isEqual = JSON.stringify(formData) === JSON.stringify(savedState);

      setUnsavedChanges(!isEqual);
    }
  }, [formData, savedState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // In a real app, we would make an API call here
      dispatch(
        updateSiteConfig({
          siteName: formData.siteName,
          siteTagline: formData.siteTagline,
          logo: formData.logo,
          favicon: formData.favicon,
          colors: {
            primary: formData.primaryColor,
            secondary: formData.secondaryColor,
            accent: formData.accentColor,
          },
          banner: {
            enabled: formData.bannerEnabled,
            text: formData.bannerText,
            link: formData.bannerLink,
          },
          footerText: formData.footerText,
          socialLinks: formData.socialLinks,
        })
      );

      toast.success("Appearance settings saved successfully");
      setSavedState({ ...formData });
      setUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving appearance settings:", error);
      toast.error("Failed to save appearance settings");
    }
  };

  const handleReset = () => {
    setFormData(savedState);
    toast.success("Changes discarded");
  };

  return (
    <AdminLayout title="Appearance">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-southern shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "general"
                  ? "border-southern-green text-southern-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "colors"
                  ? "border-southern-green text-southern-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("colors")}
            >
              Colors
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "social"
                  ? "border-southern-green text-southern-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("social")}
            >
              Social Media
            </button>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className={activeTab === "general" ? "block" : "hidden"}>
          <div className="bg-white rounded-southern shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Store Information
            </h2>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label
                  htmlFor="siteName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="siteTagline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tagline
                </label>
                <input
                  type="text"
                  id="siteTagline"
                  name="siteTagline"
                  value={formData.siteTagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  A short description displayed under your store name
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Logo
                </label>
                <div className="flex items-center mt-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-southern mr-4 overflow-hidden border border-gray-200">
                    <img
                      src={formData.logo || "/images/placeholder-logo.svg"}
                      alt="Store logo"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "/images/placeholder-logo.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="logo"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                      placeholder="/images/logo.svg"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the path to your logo image
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="favicon"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Favicon
                </label>
                <div className="flex items-center mt-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-southern mr-4 overflow-hidden border border-gray-200 flex items-center justify-center">
                    <img
                      src={formData.favicon || "/favicon.ico"}
                      alt="Favicon"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.src = "/favicon.ico";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="favicon"
                      name="favicon"
                      value={formData.favicon}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                      placeholder="/favicon.ico"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the path to your favicon (displayed in browser tabs)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-southern shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Promo Banner
            </h2>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="bannerEnabled"
                name="bannerEnabled"
                checked={formData.bannerEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-southern-green focus:ring-southern-green border-gray-300 rounded"
              />
              <label
                htmlFor="bannerEnabled"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable promotional banner at the top of the site
              </label>
            </div>

            <div
              className={
                formData.bannerEnabled
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "hidden"
              }
            >
              <div>
                <label
                  htmlFor="bannerText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Banner Text
                </label>
                <input
                  type="text"
                  id="bannerText"
                  name="bannerText"
                  value={formData.bannerText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                  placeholder="Free shipping on orders over $100"
                />
              </div>

              <div>
                <label
                  htmlFor="bannerLink"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Banner Link
                </label>
                <input
                  type="text"
                  id="bannerLink"
                  name="bannerLink"
                  value={formData.bannerLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                  placeholder="/shipping"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Where users will go when they click the banner
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-southern shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Footer</h2>

            <div>
              <label
                htmlFor="footerText"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Footer Text
              </label>
              <input
                type="text"
                id="footerText"
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-southern focus:ring-2 focus:ring-southern-green focus:border-transparent"
                placeholder="© 2023 Nonna & Rue's. All rights reserved."
              />
              <p className="mt-1 text-xs text-gray-500">
                Copyright text or additional information displayed in the footer
              </p>
            </div>
          </div>
        </div>

        {/* Colors Settings */}
        <div className={activeTab === "colors" ? "block" : "hidden"}>
          <div className="bg-white rounded-southern shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Color Scheme
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="primaryColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Primary Color
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Palette size={16} />
                  </span>
                  <input
                    type="text"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                  />
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryColor: e.target.value })
                    }
                    className="h-9 w-9 border-t border-r border-b border-gray-300 rounded-r-southern p-1 cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Main color used for buttons and accents
                </p>
              </div>

              <div>
                <label
                  htmlFor="secondaryColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Secondary Color
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Palette size={16} />
                  </span>
                  <input
                    type="text"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                  />
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="h-9 w-9 border-t border-r border-b border-gray-300 rounded-r-southern p-1 cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Used for headings and secondary elements
                </p>
              </div>

              <div>
                <label
                  htmlFor="accentColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Accent Color
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Palette size={16} />
                  </span>
                  <input
                    type="text"
                    id="accentColor"
                    name="accentColor"
                    value={formData.accentColor}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                  />
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) =>
                      setFormData({ ...formData, accentColor: e.target.value })
                    }
                    className="h-9 w-9 border-t border-r border-b border-gray-300 rounded-r-southern p-1 cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Used for backgrounds and subtle accents
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Preview
              </h3>
              <div
                className="p-6 border border-gray-200 rounded-southern"
                style={{ backgroundColor: formData.accentColor }}
              >
                <div className="max-w-md mx-auto">
                  <h4
                    className="text-xl font-heading font-semibold mb-2"
                    style={{ color: formData.secondaryColor }}
                  >
                    Color Scheme Preview
                  </h4>
                  <p className="text-gray-700 mb-4">
                    This is a preview of how your color scheme will look on your
                    website.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-southern font-medium text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Primary Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Settings */}
        <div className={activeTab === "social" ? "block" : "hidden"}>
          <div className="bg-white rounded-southern shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Social Media Links
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Facebook
                </label>
                <div className="mt-1 flex rounded-southern shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    value={formData.socialLinks.facebook.replace(
                      /^https?:\/\//,
                      ""
                    )}
                    onChange={handleSocialLinkChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-southern border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                    placeholder="facebook.com/nonnaandrues"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram
                </label>
                <div className="mt-1 flex rounded-southern shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={formData.socialLinks.instagram.replace(
                      /^https?:\/\//,
                      ""
                    )}
                    onChange={handleSocialLinkChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-southern border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                    placeholder="instagram.com/nonnaandrues"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="pinterest"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pinterest
                </label>
                <div className="mt-1 flex rounded-southern shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="pinterest"
                    id="pinterest"
                    value={formData.socialLinks.pinterest.replace(
                      /^https?:\/\//,
                      ""
                    )}
                    onChange={handleSocialLinkChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-southern border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                    placeholder="pinterest.com/nonnaandrues"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Twitter
                </label>
                <div className="mt-1 flex rounded-southern shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-southern border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    value={formData.socialLinks.twitter.replace(
                      /^https?:\/\//,
                      ""
                    )}
                    onChange={handleSocialLinkChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-southern border border-gray-300 focus:ring-southern-green focus:border-southern-green sm:text-sm"
                    placeholder="twitter.com/nonnaandrues"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions - Fixed at bottom */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between ${
            unsavedChanges ? "block" : "hidden"
          }`}
        >
          <div className="text-sm text-gray-500">
            <span className="font-medium text-southern-green">
              <Check size={16} className="inline mr-1" />
              Unsaved changes
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline-secondary flex items-center gap-1"
            >
              <Undo2 size={16} />
              <span>Discard</span>
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminAppearance;
