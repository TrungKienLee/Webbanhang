import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice'
import userSlice from './user/userSlice';
// import productSlice from './products/productSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'


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
    app : appSlice,
    user : persistReducer(userConfig,userSlice)
  },
});
export default 
