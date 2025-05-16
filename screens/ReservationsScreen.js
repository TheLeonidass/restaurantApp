import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import AppBackground from "../components/AppBackground";

const ReservationsScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axios.get(`${API_URL}/api/user/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(res.data);
    } catch (err) {
      console.log("Error fetching reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchReservations();
    }, [])
  );

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Reservation",
      "Are you sure you want to delete this reservation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              await axios.delete(`${API_URL}/api/reservations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              setReservations((prev) =>
                prev.filter((r) => r.reservation_id !== id)
              );
            } catch (err) {
              console.log("Error deleting reservation:", err);
              Alert.alert("Error", "Could not delete reservation.");
            }
          },
        },
      ]
    );
  };

  const handleUpdate = (reservation) => {
    navigation.navigate("Update Reservation", { reservation });
  };

  const formatLocalDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <AppBackground>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>My Reservations</Text>

        {reservations.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              You haven't made any reservations yet.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Select Restaurant")}
            >
              <Text style={styles.buttonText}>Make a Reservation</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.reservation_id.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => {
              const formattedDate = formatLocalDate(item.date);
              const formattedTime = item.time?.slice(0, 5);

              return (
                <View style={styles.card}>
                  <Text style={styles.restaurant}>{item.restaurant_name}</Text>
                  <Text style={styles.detail}>📅 {formattedDate}</Text>
                  <Text style={styles.detail}>⏰ {formattedTime}</Text>
                  <Text style={styles.detail}>
                    👥 {item.people_count} people
                  </Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => handleUpdate(item)}>
                      <Text style={styles.update}>✏️ Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.reservation_id)}
                    >
                      <Text style={styles.delete}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  detail: {
    fontSize: 15,
    color: "#444",
    marginVertical: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  update: {
    color: "#1e90ff",
    fontWeight: "bold",
    fontSize: 15,
  },
  delete: {
    color: "#ff4d4d",
    fontWeight: "bold",
    fontSize: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReservationsScreen;
