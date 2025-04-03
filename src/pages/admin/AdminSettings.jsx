import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Settings, Save, Undo2 } from "lucide-react";
import { updateSiteConfig } from "../../features/site/siteSlice";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const { config, loading } = useSelector((state) => state.site);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState({
    emailNotifications: true,
    orderConfirmation: true,
    shippingUpdates: true,
    marketingEmails: false,
    currencySymbol: "$",
    weightUnit: "lb",
    lengthUnit: "in",
    orderNumberPrefix: "NR",
    lowStockThreshold: 5,
    taxRate: 7.5,
    shippingOptions: [
      {
        name: "Standard Shipping",
        price: 5.99,
        estimatedDays: "3-5",
      },
      {
        name: "Express Shipping",
        price: 12.99,
        estimatedDays: "1-2",
      },
    ],
    paymentMethods: {
      creditCard: true,
      paypal: true,
      applePay: false,
      googlePay: false,
    },
  });

  const [savedState, setSavedState] = useState({});

  // Load configuration data
  useEffect(() => {
    if (config && config.settings) {
      const initialFormData = {
        emailNotifications: config.settings.emailNotifications ?? true,
        orderConfirmation: config.settings.orderConfirmation ?? true,
        shippingUpdates: config.settings.shippingUpdates ?? true,
        marketingEmails: config.settings.marketingEmails ?? false,
        currencySymbol: config.settings.currencySymbol || "$",
        weightUnit: config.settings.weightUnit || "lb",
        lengthUnit: config.settings.lengthUnit || "in",
        orderNumberPrefix: config.settings.orderNumberPrefix || "NR",
        lowStockThreshold: config.settings.lowStockThreshold || 5,
        taxRate: config.settings.taxRate || 7.5,
        shippingOptions: config.settings.shippingOptions || [
          {
            name: "Standard Shipping",
            price: 5.99,
            estimatedDays: "3-5",
          },
          {
            name: "Express Shipping",
            price: 12.99,
            estimatedDays: "1-2",
          },
        ],
        paymentMethods: config.settings.paymentMethods || {
          creditCard: true,
          paypal: true,
          applePay: false,
          googlePay: false,
        },
      };

      setFormData(initialFormData);
      setSavedState(initialFormData);
    }
  }, [config]);

  // Check for unsaved changes
  useEffect(() => {
    if (Object.keys(savedState).length > 0) {
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
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaymentMethodChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [name]: checked,
      },
    }));
  };

  const handleShippingOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.shippingOptions];

    if (field === "price") {
      value = parseFloat(value);
    }

    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      shippingOptions: updatedOptions,
    }));
  };

  const handleAddShippingOption = () => {
    setFormData((prev) => ({
      ...prev,
      shippingOptions: [
        ...prev.shippingOptions,
        {
          name: "New Shipping Option",
          price: 0.0,
          estimatedDays: "3-5",
        },
      ],
    }));
  };

  const handleRemoveShippingOption = (index) => {
    const updatedOptions = [...formData.shippingOptions];
    updatedOptions.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      shippingOptions: updatedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Update site config with settings
      const updatedConfig = {
        ...config,
        settings: {
          emailNotifications: formData.emailNotifications,
          orderConfirmation: formData.orderConfirmation,
          shippingUpdates: formData.shippingUpdates,
          marketingEmails: formData.marketingEmails,
          currencySymbol: formData.currencySymbol,
          weightUnit: formData.weightUnit,
          lengthUnit: formData.lengthUnit,
          orderNumberPrefix: formData.orderNumberPrefix,
          lowStockThreshold: formData.lowStockThreshold,
          taxRate: formData.taxRate,
          shippingOptions: formData.shippingOptions,
          paymentMethods: formData.paymentMethods,
        },
      };

      dispatch(updateSiteConfig(updatedConfig));
      toast.success("Settings saved successfully");
      setSavedState({ ...formData });
      setUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    }
  };

  const handleReset = () => {
    setFormData(savedState);
    toast.success("Changes discarded");
  };

  return (
    <div className="admin-settings">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings size={24} /> Store Settings
      </h1>

      {unsavedChanges && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div>
              <p className="text-sm text-yellow-700">
                You have unsaved changes. Save or discard before leaving this
                page.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* General Settings Section */}
          <div className="bg-white rounded-southern shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              General Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currencySymbol"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Currency Symbol
                </label>
                <select
                  id="currencySymbol"
                  name="currencySymbol"
                  value={formData.currencySymbol}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-southern-green focus:border-southern-green sm:text-sm rounded-md"
                >
                  <option value="$">$ (USD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="¥">¥ (JPY)</option>
                  <option value="A$">A$ (AUD)</option>
                  <option value="C$">C$ (CAD)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="weightUnit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Weight Unit
                </label>
                <select
                  id="weightUnit"
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-southern-green focus:border-southern-green sm:text-sm rounded-md"
                >
                  <option value="lb">lb (Pound)</option>
                  <option value="oz">oz (Ounce)</option>
                  <option value="kg">kg (Kilogram)</option>
                  <option value="g">g (Gram)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="lengthUnit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Length Unit
                </label>
                <select
                  id="lengthUnit"
                  name="lengthUnit"
                  value={formData.lengthUnit}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-southern-green focus:border-southern-green sm:text-sm rounded-md"
                >
                  <option value="in">in (Inch)</option>
                  <option value="ft">ft (Foot)</option>
                  <option value="cm">cm (Centimeter)</option>
                  <option value="m">m (Meter)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="orderNumberPrefix"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Order Number Prefix
                </label>
                <input
                  type="text"
                  id="orderNumberPrefix"
                  name="orderNumberPrefix"
                  value={formData.orderNumberPrefix}
                  onChange={handleChange}
                  className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="lowStockThreshold"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  min="1"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                  className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="taxRate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  min="0"
                  step="0.1"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-southern shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Notification Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="emailNotifications"
                    className="font-medium text-gray-700"
                  >
                    Enable Email Notifications
                  </label>
                  <p className="text-gray-500">
                    Master toggle for all email notifications
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="orderConfirmation"
                    name="orderConfirmation"
                    type="checkbox"
                    checked={formData.orderConfirmation}
                    onChange={handleChange}
                    disabled={!formData.emailNotifications}
                    className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded disabled:opacity-50"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="orderConfirmation"
                    className="font-medium text-gray-700"
                  >
                    Order Confirmation Emails
                  </label>
                  <p className="text-gray-500">
                    Send email when order is placed
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="shippingUpdates"
                    name="shippingUpdates"
                    type="checkbox"
                    checked={formData.shippingUpdates}
                    onChange={handleChange}
                    disabled={!formData.emailNotifications}
                    className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded disabled:opacity-50"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="shippingUpdates"
                    className="font-medium text-gray-700"
                  >
                    Shipping Update Emails
                  </label>
                  <p className="text-gray-500">
                    Send email when order status changes
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketingEmails"
                    name="marketingEmails"
                    type="checkbox"
                    checked={formData.marketingEmails}
                    onChange={handleChange}
                    disabled={!formData.emailNotifications}
                    className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded disabled:opacity-50"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="marketingEmails"
                    className="font-medium text-gray-700"
                  >
                    Marketing Emails
                  </label>
                  <p className="text-gray-500">
                    Send promotional emails and newsletters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-white rounded-southern shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Payment Methods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="creditCard"
                  name="creditCard"
                  type="checkbox"
                  checked={formData.paymentMethods.creditCard}
                  onChange={handlePaymentMethodChange}
                  className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="creditCard"
                  className="font-medium text-gray-700"
                >
                  Credit Card
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="paypal"
                  name="paypal"
                  type="checkbox"
                  checked={formData.paymentMethods.paypal}
                  onChange={handlePaymentMethodChange}
                  className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="paypal" className="font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="applePay"
                  name="applePay"
                  type="checkbox"
                  checked={formData.paymentMethods.applePay}
                  onChange={handlePaymentMethodChange}
                  className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="applePay" className="font-medium text-gray-700">
                  Apple Pay
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="googlePay"
                  name="googlePay"
                  type="checkbox"
                  checked={formData.paymentMethods.googlePay}
                  onChange={handlePaymentMethodChange}
                  className="focus:ring-southern-green h-4 w-4 text-southern-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="googlePay"
                  className="font-medium text-gray-700"
                >
                  Google Pay
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Options Section */}
        <div className="bg-white rounded-southern shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Shipping Options
          </h2>

          <div className="space-y-4">
            {formData.shippingOptions.map((option, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">
                    Shipping Option {index + 1}
                  </h3>
                  {formData.shippingOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveShippingOption(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) =>
                        handleShippingOptionChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ({formData.currencySymbol})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={option.price}
                      onChange={(e) =>
                        handleShippingOptionChange(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                      className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Days
                    </label>
                    <input
                      type="text"
                      value={option.estimatedDays}
                      onChange={(e) =>
                        handleShippingOptionChange(
                          index,
                          "estimatedDays",
                          e.target.value
                        )
                      }
                      className="mt-1 focus:ring-southern-green focus:border-southern-green block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g. 3-5"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddShippingOption}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-southern-green hover:bg-southern-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-southern-green"
            >
              Add Shipping Option
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4 justify-end">
          {unsavedChanges && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-southern-green"
            >
              <Undo2 className="mr-2 h-4 w-4" />
              Discard Changes
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !unsavedChanges}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-southern-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-southern-green ${
              loading || !unsavedChanges
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-southern-green/90"
            }`}
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
