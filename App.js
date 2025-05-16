import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ReservationsScreen from "./screens/ReservationsScreen";
import UpdateReservationScreen from "./screens/UpdateReservationScreen";
import SelectRestaurantScreen from "./screens/SelectRestaurantScreen";
import CreateReservationScreen from "./screens/CreateReservationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Reservations"
          component={ReservationsScreen}
          options={{ title: "My Reservations" }}
        />
        <Stack.Screen
          name="Update Reservation"
          component={UpdateReservationScreen}
        />
        <Stack.Screen
          name="Create Reservation"
          component={CreateReservationScreen}
        />
        <Stack.Screen
          name="Select Restaurant"
          component={SelectRestaurantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
