import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Get user from localStorage if it exists
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state
const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // For demonstration purposes, we'll simulate a successful login
      // In a real app, you would make an API call to your backend

      // Simulated API response
      if (email === "admin@nonnaandrues.com" && password === "password123") {
        const userData = {
          id: "1",
          firstName: "Admin",
          lastName: "User",
          email: "admin@nonnaandrues.com",
          isAdmin: true,
          token: "simulated-jwt-token",
        };

        // Save to localStorage
        localStorage.setItem("userInfo", JSON.stringify(userData));

        return userData;
      } else {
        // Simulate authentication failure
        return rejectWithValue("Invalid email or password");
      }

      // Real implementation would look like:
      // const response = await fetch('/api/users/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Login failed');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // For demonstration purposes, we'll simulate a successful registration
      // In a real app, you would make an API call to your backend

      // Simulated API response
      const registeredUser = {
        id: "2",
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        isAdmin: false,
        token: "simulated-jwt-token",
      };

      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(registeredUser));

      return registeredUser;

      // Real implementation would look like:
      // const response = await fetch('/api/users/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Registration failed');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("userInfo");
  // Also clear any other user-related data from localStorage
  return null;
});

// Update profile thunk
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().auth;

      // For demonstration purposes, we'll simulate a successful profile update
      // In a real app, you would make an API call to your backend

      // Simulated API response
      const updatedUser = {
        ...userInfo,
        ...userData,
      };

      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      return updatedUser;

      // Real implementation would look like:
      // const response = await fetch('/api/users/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      //   body: JSON.stringify(userData),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Update failed');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Update failed");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })

      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
