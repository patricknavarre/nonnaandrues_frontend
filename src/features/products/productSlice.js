import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopifyService from "../../services/shopifyService";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await shopifyService.getProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

// Fetch a single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await shopifyService.getProduct(id);
      return response.product;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product");
    }
  }
);

// Create a new product - Admin only
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await shopifyService.createProduct(
        productData,
        auth.token
      );
      return response.product;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create product");
    }
  }
);

// Update a product - Admin only
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await shopifyService.updateProduct(
        id,
        productData,
        auth.token
      );
      return response.product;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update product");
    }
  }
);

// Delete a product - Admin only
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await shopifyService.deleteProduct(id, auth.token);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete product");
    }
  }
);

// Fetch collections
export const fetchCollections = createAsyncThunk(
  "products/fetchCollections",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await shopifyService.getCollections(params);
      return response.collections;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch collections");
    }
  }
);

const initialState = {
  products: [],
  product: null,
  collections: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductStatus: (state) => {
      state.error = null;
      state.success = false;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Update product in list if it exists
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }

        // Update currently selected product
        if (state.product && state.product.id === action.payload.id) {
          state.product = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter((p) => p.id !== action.payload);

        // Clear selected product if it was deleted
        if (state.product && state.product.id === action.payload) {
          state.product = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch collections
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductStatus, clearProduct } = productSlice.actions;
export default productSlice.reducer;
