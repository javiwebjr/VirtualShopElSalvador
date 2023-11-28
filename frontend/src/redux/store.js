import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice';
import favoritesReducer from '../redux/features/favorites/favoriteSlice';
import cartSliceReducer from "./features/cart/cartSlice";
import shopSliceReducer from "./features/shop/shopSlice";
import subShopSliceReducer from './features/shop/subShopSlice';
import { getFavorites } from "../utilities/favoriteStorage";

const initialFavorites = getFavorites() || []; 

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer,
        subshop: subShopSliceReducer
    },
    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
setupListeners(store.dispatch);
export default store;