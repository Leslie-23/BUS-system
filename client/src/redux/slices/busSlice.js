import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API requests
const API_URL = "http://localhost:8000/api/v1/bus";

// Async Thunks
export const fetchAllBuses = createAsyncThunk(
  "bus/fetchAllBuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/viewAllBus`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBusById = createAsyncThunk(
  "bus/fetchBusById",
  async (busId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/view/${busId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBusesByType = createAsyncThunk(
  "bus/fetchBusesByType",
  async (busType, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/viewBusType/${busType}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBus = createAsyncThunk(
  "bus/addBus",
  async (busData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, busData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBus = createAsyncThunk(
  "bus/updateBus",
  async ({ busId, busData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update`, {
        busId,
        ...busData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBus = createAsyncThunk(
  "bus/deleteBus",
  async (busId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${busId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  buses: [],
  bus: null,
  loading: false,
  error: null,
};

// Bus Slice
const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBus: (state) => {
      state.bus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Buses
      .addCase(fetchAllBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(fetchAllBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Bus by ID
      .addCase(fetchBusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusById.fulfilled, (state, action) => {
        state.loading = false;
        state.bus = action.payload;
      })
      .addCase(fetchBusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Buses by Type
      .addCase(fetchBusesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusesByType.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(fetchBusesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Bus
      .addCase(addBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBus.fulfilled, (state, action) => {
        state.loading = false;
        state.buses.push(action.payload);
      })
      .addCase(addBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Bus
      .addCase(updateBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.buses.findIndex(
          (bus) => bus._id === action.payload._id
        );
        if (index !== -1) {
          state.buses[index] = action.payload;
        }
      })
      .addCase(updateBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Bus
      .addCase(deleteBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = state.buses.filter(
          (bus) => bus._id !== action.payload._id
        );
      })
      .addCase(deleteBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Actions and Reducer
export const { clearError, clearBus } = busSlice.actions;
export default busSlice.reducer;
