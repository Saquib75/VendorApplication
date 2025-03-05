import { EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction, configureStore } from '@reduxjs/toolkit'
// import themeSlice from './slices/theme.slice'
// import cartSlice from './slices/cart.slice'
import { composeWithDevTools } from '@redux-devtools/extension';
import authSlice from './slices/auth.slice';
import configSlice from './slices/config.slice';
// import walletSlice from './slices/wallet.slice';
// const createDebugger = require("redux-flipper").default;

const rootReducer = {
  auth: authSlice,
  // config: configSlice,
}
var store:EnhancedStore<any, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<any, undefined, UnknownAction>;
}>, StoreEnhancer]>>;
if(false){
// if (__DEV__) {
  // store = configureStore({
  //   reducer: rootReducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createDebugger()),
  //   devTools: process.env.NODE_ENV !== 'production',
  //   //@ts-ignore
  //   enhancers: composeWithDevTools()
  // })
} else {
  store = configureStore({
    reducer: rootReducer,
  })
}
export default store