import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import 
export const store = configureStore({
  reducer: {
    app : appSlice
  },
});
