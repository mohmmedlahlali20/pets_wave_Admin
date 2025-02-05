import path from "@/app/axios/path";
import { GetAllUsers } from "@/app/dashboard/server/getAllUsers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const getUsers = createAsyncThunk(
    "auth/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const users = await GetAllUsers();
            return users || [];
        } catch (err) {
            console.log(err);
            return rejectWithValue("Erreur lors de la récupération des utilisateurs");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await path.post("auth/login", { email, password });

            if (response.data) {
                Cookies.set("token", response.data.token, { expires: 7 });
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Une erreur s'est produite");
        }
    }
);

const initialState = {
    user: null,
    users: [],  
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.users = [];  
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
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; 
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
