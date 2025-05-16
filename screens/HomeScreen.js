import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppBackground from "../components/AppBackground";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.replace("Login");
  };

  const goToReservations = () => {
    navigation.navigate("Reservations");
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>👋 Welcome!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Select Restaurant")}
        >
          <Text style={styles.buttonText}>Make a Reservation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToReservations}>
          <Text style={styles.buttonText}>My Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
