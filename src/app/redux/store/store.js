import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import categoryReducer from '../slice/categorySlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      category: categoryReducer
    },
  });