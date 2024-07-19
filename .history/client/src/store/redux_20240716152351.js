import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import productSlice from './products/productSlice'
import storage

export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
