import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import productSlice 
export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
