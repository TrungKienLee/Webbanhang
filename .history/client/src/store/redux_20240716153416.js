import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
// import productSlice from './products/productSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import userSlice from './user/userSlice';

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current']
}
 const store = configureStore({
  reducer: {
    app : appSlice
    user : per
  },
});
