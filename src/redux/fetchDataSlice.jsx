import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../api/axiosApi";

export const fetchListing = createAsyncThunk(
  "listings/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get("/listings.json");

      const data = res.data;
      if (!data) return []; // no listings

      // convert object -> array
      return Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const fetchDataSlice=createSlice({
    name:"listings",
    initialState:{
        items:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchListing.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchListing.fulfilled,(state,action)=>{
            state.loading=false;
            state.items=action.payload;
        })
        .addCase(fetchListing.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    },
});
export default fetchDataSlice.reducer;