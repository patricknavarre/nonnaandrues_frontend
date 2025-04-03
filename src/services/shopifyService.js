import Client from "shopify-buy";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6041/api";

// Initialize Shopify Client for client-side operations
// (This will be configured once you have your Shopify store credentials)
let shopifyClient = null;

export const initShopifyClient = (domain, storefrontAccessToken) => {
  if (!domain || !storefrontAccessToken) return null;

  shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
  });

  return shopifyClient;
};

// Use our backend as a proxy to Shopify Admin API
// (Our backend handles authentication and security)
const shopifyService = {
  // Products
  getProducts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/shopify/products`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/shopify/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createProduct: async (productData, token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/shopify/products`,
        productData,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProduct: async (id, productData, token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${API_URL}/shopify/products/${id}`,
        productData,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteProduct: async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${API_URL}/shopify/products/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Collections
  getCollections: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/shopify/collections`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Checkout
  createCheckout: async (checkoutData) => {
    try {
      const response = await axios.post(
        `${API_URL}/shopify/checkout`,
        checkoutData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Client-side methods using Shopify Buy SDK
  getClientCheckout: async () => {
    if (!shopifyClient) return null;

    try {
      return await shopifyClient.checkout.create();
    } catch (error) {
      throw error;
    }
  },

  addLineItems: async (checkoutId, lineItems) => {
    if (!shopifyClient) return null;

    try {
      return await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
    } catch (error) {
      throw error;
    }
  },

  updateLineItems: async (checkoutId, lineItems) => {
    if (!shopifyClient) return null;

    try {
      return await shopifyClient.checkout.updateLineItems(
        checkoutId,
        lineItems
      );
    } catch (error) {
      throw error;
    }
  },

  removeLineItems: async (checkoutId, lineItemIds) => {
    if (!shopifyClient) return null;

    try {
      return await shopifyClient.checkout.removeLineItems(
        checkoutId,
        lineItemIds
      );
    } catch (error) {
      throw error;
    }
  },
};

export default shopifyService;
