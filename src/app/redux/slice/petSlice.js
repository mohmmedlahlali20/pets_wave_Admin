import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import path from "@/app/axios/path";
import { getAllPets } from "@/app/dashboard/server/GetAllPets";

export const getPets = createAsyncThunk("pets/getPets", async (_, { rejectWithValue }) => {
    try {
        const petsData = await getAllPets();
        return petsData || [];
    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong");
    }
});



export const addPet = createAsyncThunk("pets/addPet", async (petData, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        Object.entries(petData).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((image) => formData.append("images", image));
            } else {
                formData.append(key, value);
            }
        });

        const res = await path.post("pets/create", formData);
        if (res.status === 201) {
            return res.data;
        }
    } catch (err) {
        return rejectWithValue(err.message || "Error adding pet");
    }
});

const initialState = {
    loading: false,
    error: null,
    pets: [],
    categories: [],
};

const petSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPets.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = action.payload;
            })
            .addCase(getPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addPet.fulfilled, (state, action) => {
                state.pets.push(action.payload);
            });
    },
});

export default petSlice.reducer;
