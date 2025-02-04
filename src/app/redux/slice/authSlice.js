import path from "@/app/axios/path";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        {
            email,
            password
        },
        {
            rejectWithValue
        }
    ) => {
        try {
            const response = await path.post("auth/login", { email, password });
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');

            if (response.data) {
                Cookies.set("token", response.data.token, { expires: 7 });
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Une erreur s'est produite");
        }
    });

const initialState = {
    user: null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
