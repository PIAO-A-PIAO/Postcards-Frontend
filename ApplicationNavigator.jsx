import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Pages from "./pages";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./api/authSlice";

const {
  EntryPoint,
  Signup,
  Login,
  ForgetPassword,
  Home,
  CategoryOverview,
  ProductRating,
  AccountInfo,
  SearchPage,
  RewardHome,
  PizzaReward,
} = Pages;

const Stack = createNativeStackNavigator();
function ApplicationNavigator() {
  const token = useSelector(selectCurrentToken);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {token ? ( */}
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AccountInfo"
              component={AccountInfo}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CategoryOverview"
              component={CategoryOverview}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ProductRating"
              component={ProductRating}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SearchPage"
              component={SearchPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="RewardHome"
              component={RewardHome}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PizzaReward"
              component={PizzaReward}
            />
          </>
        {/* ) : ( */}
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="EntryPoint"
              component={EntryPoint}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ForgetPassword"
              component={ForgetPassword}
            />
          </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
