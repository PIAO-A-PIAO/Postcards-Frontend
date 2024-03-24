import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice.js"
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice.js";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'token']
}

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['user', 'token']
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistReducer(authPersistConfig, authReducer)
})

export const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: getDefaulMiddleware =>
    getDefaulMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch);

export const persistor = persistStore(store)