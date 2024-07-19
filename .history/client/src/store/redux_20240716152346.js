import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import productSlice from './products/productSlice'
import 

export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
