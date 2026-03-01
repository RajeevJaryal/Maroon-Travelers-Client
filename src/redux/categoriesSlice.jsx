import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../api/axiosApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get("/categories.json");
      const data = res.data || {};

      return Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.error ||
        err?.message ||
        "Failed to fetch categories"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;