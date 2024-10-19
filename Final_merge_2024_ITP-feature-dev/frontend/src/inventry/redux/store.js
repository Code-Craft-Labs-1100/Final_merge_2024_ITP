import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Importing reducers from both stores
import userReducer from "./user/userSlice";
import productsReducer from "./product/productSlice";
import { productsApi } from "./product/productApi";
import cartReducer, { getCartTotal } from "./cart/cartSlice";

import transportSlice from "../../component/Transport/store/reducer";
import { apiSlice } from "../../component/Transport/store/apiSlice";

// Combine reducers from both stores
const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer, // API reducer from storeIn
  transport: transportSlice, // Transport reducer from store
  [apiSlice.reducerPath]: apiSlice.reducer, // API reducer from store
});

// Persistence configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with combined reducers and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }) // Disable serializable check for redux-persist
      .concat(productsApi.middleware) // Add products API middleware
      .concat(apiSlice.middleware), // Add transport API middleware
});

// Dispatch initial actions (e.g., getCartTotal)
store.dispatch(getCartTotal()); // Dispatch initial cart calculation

// Persist store
export const persistor = persistStore(store);
