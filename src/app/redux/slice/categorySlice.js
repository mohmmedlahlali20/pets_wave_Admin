import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import path from "../../axios/path";
import { getAllcategory } from "@/app/dashboard/server/getAllCategory";

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


export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
        console.log("fuck :", formData);
        
      const res = await path.post("category/create_Category", formData);
      if (res.status === 201) {
        return res.data; 
      }
    } catch (err) {
      console.error("Error adding category:", err);
      return rejectWithValue(err.message || "Error adding category");
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
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding category";
      });
  },
});

export default categorySlice.reducer;
