import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import logoImage from "../../assets/images/nonna-and-rues-logo.svg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6041/api";

// Fetch site config from API
export const fetchSiteConfig = createAsyncThunk(
  "site/fetchSiteConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cms/config`);
      return response.data.config;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch site configuration"
      );
    }
  }
);

// Update site config
export const updateSiteConfig = createAsyncThunk(
  "site/updateSiteConfig",
  async (configData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await axios.put(
        `${API_URL}/cms/config`,
        configData,
        config
      );
      return response.data.config;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update site configuration"
      );
    }
  }
);

// Default site config values
const defaultConfig = {
  siteName: "Nonna & Rue's Unique Finds",
  logo: {
    url: logoImage,
    alt: "Nonna & Rue's Unique Finds Logo",
  },
  colors: {
    primary: "#a67c52",
    secondary: "#2a623d",
    accent: "#e9d8c4",
    text: "#333333",
    background: "#f9f7f3",
  },
  fonts: {
    heading: "Playfair Display",
    body: "Montserrat",
  },
  heroSection: {
    title: "Nonna & Rue's Unique Finds",
    subtitle:
      "Curated treasures and vintage collectibles with a touch of Southern charm",
    buttonText: "Browse Our Collection",
    buttonLink: "/products",
  },
  aboutSection: {
    title: "Our Story",
    content:
      "At Nonna & Rue's, we bring you a carefully curated selection of unique finds, vintage treasures, and handcrafted items that reflect the warm hospitality and timeless elegance of cherished family traditions.",
  },
};

const initialState = {
  config: defaultConfig,
  loading: false,
  error: null,
  success: false,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    resetSiteStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch site config
      .addCase(fetchSiteConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchSiteConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Use default config if fetch fails
        if (!state.config) {
          state.config = defaultConfig;
        }
      })

      // Update site config
      .addCase(updateSiteConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSiteConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
        state.success = true;
      })
      .addCase(updateSiteConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSiteStatus } = siteSlice.actions;
export default siteSlice.reducer;
