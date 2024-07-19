import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import productSlice from './pro'
export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
