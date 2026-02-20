import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../api/axiosApi";

// ✅ Create booking: save in 2 places
export const createBooking = createAsyncThunk(
  "bookings/create",
  async ({ bookingData, idToken, userId }, { rejectWithValue }) => {
    try {
      if (!idToken) throw new Error("Please login to book");
      if (!userId) throw new Error("Missing userId");

      // ✅ Build booking payload (include snapshot here)
      const payload = {
        ...bookingData,
        status: "pending",
        createdAt: Date.now(),
      };

      // 1) ✅ Save global booking for admin
      const res = await axiosApi.post(`/bookings.json?auth=${idToken}`, payload);
      const bookingId = res.data.name;

      // 2) ✅ Save under user for order history
      await axiosApi.put(
        `/bookingsByUser/${userId}/${bookingId}.json?auth=${idToken}`,
        payload
      );

      return { id: bookingId, ...payload };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ✅ Fetch bookings of one user (Order History)
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ userId }, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("Missing userId");

      const res = await axiosApi.get(`/bookingsByUser/${userId}.json`);

      const data = res.data;
      if (!data) return [];

      return Object.entries(data).map(([id, b]) => ({ id, ...b }));
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || e.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    creating: false,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearBookingStatus: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createBooking.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.creating = false;
        state.success = "Booking submitted ✅";
        // optional: push into items (so UI updates instantly)
        state.items.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // fetch
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;