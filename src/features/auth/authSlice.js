import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6041/api";

// Admin credentials from .env
const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

// Get admin from localStorage
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const token = localStorage.getItem("token");

// Login admin using hardcoded credentials
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Attempting admin login with:", userData.email);

      // Check against hardcoded credentials
      if (
        userData.email === ADMIN_USERNAME &&
        userData.password === ADMIN_PASSWORD
      ) {
        // Create a mock admin user and token
        const adminUser = {
          _id: "admin-user",
          name: "Admin User",
          email: userData.email,
          role: "admin",
        };

        // Generate a simple token (in a real app, you'd use JWT or similar)
        const mockToken = btoa(`${adminUser.email}:${Date.now()}`);

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(adminUser));
        localStorage.setItem("token", mockToken);

        return {
          success: true,
          user: adminUser,
          token: mockToken,
        };
      }

      // If credentials don't match
      return rejectWithValue("Invalid email or password");
    } catch (error) {
      console.error("Login error:", error.message);
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

// Logout admin
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
});

// Get admin profile (simplified to just return the stored user)
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      if (!auth.user || auth.user.role !== "admin") {
        return rejectWithValue("Access denied. Admin privileges required.");
      }

      return {
        success: true,
        user: auth.user,
      };
    } catch (error) {
      return rejectWithValue("Failed to get profile");
    }
  }
);

// Update admin profile (simplified)
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      if (!auth.user || auth.user.role !== "admin") {
        return rejectWithValue("Access denied. Admin privileges required.");
      }

      // Update the user object with new data
      const updatedUser = {
        ...auth.user,
        name: userData.name || auth.user.name,
        email: userData.email || auth.user.email,
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        success: true,
        user: updatedUser,
      };
    } catch (error) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!token && !!user && user.role === "admin",
  isAdmin: !!user && user.role === "admin",
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === "admin";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.loading = false;
      })

      // Get profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user.role === "admin";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user.role === "admin";
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
