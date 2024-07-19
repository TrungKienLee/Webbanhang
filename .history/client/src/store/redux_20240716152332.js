import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import productSlice from './products/prod'
export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
