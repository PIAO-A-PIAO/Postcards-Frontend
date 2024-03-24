import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationContext } from "./context/Authentication";
import { AuthProvider } from "./context/AuthProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "./api/store";
import { Provider, useSelector } from "react-redux";
import { selectCurrentToken } from "./api/authSlice";
import { PersistGate } from "redux-persist/es/integration/react.js";
import ApplicationNavigator from "./ApplicationNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  );
}
