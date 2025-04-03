import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopifyService from "../../services/shopifyService";

// Get cart from localStorage
const items = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const checkoutId = localStorage.getItem("checkoutId") || null;

// Create a new checkout
export const createCheckout = createAsyncThunk(
  "cart/createCheckout",
  async (_, { rejectWithValue }) => {
    try {
      const checkout = await shopifyService.getClientCheckout();
      return checkout;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create checkout");
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue, getState, dispatch }) => {
    try {
      const { cart } = getState();

      // Create checkout if it doesn't exist
      if (!cart.checkoutId) {
        await dispatch(createCheckout()).unwrap();
      }

      const { checkoutId } = getState().cart;

      // Format the line item for Shopify
      const lineItem = {
        variantId: cartItem.variantId,
        quantity: cartItem.quantity,
      };

      // Add to Shopify checkout
      const checkout = await shopifyService.addLineItems(checkoutId, [
        lineItem,
      ]);

      return {
        item: {
          id: cartItem.id,
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          title: cartItem.title,
          price: cartItem.price,
          image: cartItem.image,
          quantity: cartItem.quantity,
        },
        checkout,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Could not add to cart");
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }, { rejectWithValue, getState }) => {
    try {
      const { cart } = getState();
      const { checkoutId } = cart;

      // Find the item in the cart
      const item = cart.items.find((i) => i.id === id);

      if (!item) {
        return rejectWithValue("Item not found in cart");
      }

      // Format the line item for Shopify
      const lineItem = {
        id,
        quantity,
      };

      // Update the item in Shopify checkout
      const checkout = await shopifyService.updateLineItems(checkoutId, [
        lineItem,
      ]);

      return { id, quantity, checkout };
    } catch (error) {
      return rejectWithValue(error.message || "Could not update cart item");
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { cart } = getState();
      const { checkoutId } = cart;

      // Remove from Shopify checkout
      const checkout = await shopifyService.removeLineItems(checkoutId, [id]);

      return { id, checkout };
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not remove item from cart"
      );
    }
  }
);

const initialState = {
  items: items,
  checkoutId: checkoutId,
  checkoutUrl: null,
  subtotal: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      localStorage.removeItem("cartItems");
    },
    setCheckoutUrl: (state, action) => {
      state.checkoutUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create checkout
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutId = action.payload.id;
        localStorage.setItem("checkoutId", action.payload.id);
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.item.id
        );

        if (existingItemIndex !== -1) {
          // Update existing item
          state.items[existingItemIndex].quantity +=
            action.payload.item.quantity;
        } else {
          // Add new item to cart
          state.items.push(action.payload.item);
        }

        // Update checkout URL
        if (action.payload.checkout && action.payload.checkout.webUrl) {
          state.checkoutUrl = action.payload.checkout.webUrl;
        }

        // Update local storage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;

        // Update item quantity
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = action.payload.quantity;
        }

        // Update checkout URL
        if (action.payload.checkout && action.payload.checkout.webUrl) {
          state.checkoutUrl = action.payload.checkout.webUrl;
        }

        // Update local storage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;

        // Remove item from array
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        // Update checkout URL
        if (action.payload.checkout && action.payload.checkout.webUrl) {
          state.checkoutUrl = action.payload.checkout.webUrl;
        }

        // Update local storage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, setCheckoutUrl } = cartSlice.actions;
export default cartSlice.reducer;
