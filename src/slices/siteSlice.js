import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Get site settings from localStorage if they exist
const siteSettingsFromStorage = localStorage.getItem("siteSettings")
  ? JSON.parse(localStorage.getItem("siteSettings"))
  : null;

// Default site settings
const defaultSettings = {
  siteName: "Nonna & Rues",
  logo: "/logo.svg",
  primaryColor: "#b91c1c",
  secondaryColor: "#fbbf24",
  heroImage: "/images/hero.jpg",
  footerText: "© 2023 Nonna & Rues. All rights reserved.",
  contactEmail: "info@nonnaandrues.com",
  contactPhone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  socialLinks: {
    facebook: "https://facebook.com/nonnaandrues",
    instagram: "https://instagram.com/nonnaandrues",
    twitter: "https://twitter.com/nonnaandrues",
  },
  navLinks: [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ],
};

// Initial state
const initialState = {
  settings: siteSettingsFromStorage || defaultSettings,
  loading: false,
  error: null,
};

// Get site settings thunk
export const getSiteSettings = createAsyncThunk(
  "site/getSiteSettings",
  async (_, { rejectWithValue }) => {
    try {
      // For demonstration purposes, we'll use the settings from localStorage or defaults
      // In a real app, you would make an API call to your backend

      const settings = localStorage.getItem("siteSettings")
        ? JSON.parse(localStorage.getItem("siteSettings"))
        : defaultSettings;

      return settings;

      // Real implementation would look like:
      // const response = await fetch('/api/site/settings');
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Failed to fetch site settings');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('siteSettings', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch site settings");
    }
  }
);

// Update site settings thunk
export const updateSiteSettings = createAsyncThunk(
  "site/updateSiteSettings",
  async (updatedSettings, { getState, rejectWithValue }) => {
    try {
      const { settings: currentSettings } = getState().site;

      // For demonstration purposes, we'll simulate a successful update
      // In a real app, you would make an API call to your backend

      // Merge current settings with updated settings
      const newSettings = {
        ...currentSettings,
        ...updatedSettings,
      };

      // Save to localStorage
      localStorage.setItem("siteSettings", JSON.stringify(newSettings));

      // Simulate a delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      return newSettings;

      // Real implementation would look like:
      // const response = await fetch('/api/site/settings', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${getState().auth.userInfo.token}`,
      //   },
      //   body: JSON.stringify(updatedSettings),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Failed to update site settings');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('siteSettings', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update site settings");
    }
  }
);

// Reset site settings thunk
export const resetSiteSettings = createAsyncThunk(
  "site/resetSiteSettings",
  async (_, { rejectWithValue }) => {
    try {
      // For demonstration purposes, we'll simulate a successful reset
      // In a real app, you would make an API call to your backend

      // Save default settings to localStorage
      localStorage.setItem("siteSettings", JSON.stringify(defaultSettings));

      return defaultSettings;

      // Real implementation would look like:
      // const response = await fetch('/api/site/settings/reset', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${getState().auth.userInfo.token}`,
      //   },
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData.message || 'Failed to reset site settings');
      // }
      //
      // const data = await response.json();
      // localStorage.setItem('siteSettings', JSON.stringify(data));
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to reset site settings");
    }
  }
);

// Site slice
const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get site settings cases
    builder
      .addCase(getSiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getSiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update site settings cases
      .addCase(updateSiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        toast.success("Site settings updated successfully!");
      })
      .addCase(updateSiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to update site settings");
      })

      // Reset site settings cases
      .addCase(resetSiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetSiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        toast.success("Site settings reset to defaults!");
      })
      .addCase(resetSiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to reset site settings");
      });
  },
});

export const { clearError } = siteSlice.actions;

export default siteSlice.reducer;
