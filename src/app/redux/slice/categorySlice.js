import { getAllcategory } from "@/app/dashboard/server/getAllCategory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllcategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categoryData = await getAllcategory();
      return categoryData || [];
    } catch (err) {
      console.log("Fetch category error", err);
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  categories: [], 
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllcategories.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getAllcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; 
      })
      .addCase(getAllcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load categories"; 
      });
  },
});

export default categorySlice.reducer;
