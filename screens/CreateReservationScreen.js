import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppBackground from "../components/AppBackground";

const CreateReservationScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [people, setPeople] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      if (hours < 12 || hours > 22) {
        Alert.alert(
          "Invalid Time",
          "Please select a time between 12:00 and 22:00."
        );
        return;
      }
      setTime(selectedTime);
    }
  };

  const handleCreateReservation = async () => {
    if (!people || isNaN(people) || Number(people) < 2 || Number(people) > 8) {
      Alert.alert(
        "Invalid People Count",
        "Reservation must be for 2 to 8 people."
      );
      return;
    }

    const token = await AsyncStorage.getItem("token");

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const formattedTime = time.toTimeString().slice(0, 5);

    try {
      await axios.post(
        `${API_URL}/api/reservations`,
        {
          restaurant_id: restaurant.restaurant_id,
          date: formattedDate,
          time: formattedTime,
          people_count: people,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Reservation created!");
      navigation.navigate("Reservations");
    } catch (err) {
      console.log("Create error:", err);
      Alert.alert("Error", "Could not create reservation.");
    }
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Make a Reservation</Text>

        <Text style={styles.label}>🍽️ Restaurant:</Text>
        <Text style={styles.value}>{restaurant.name}</Text>

        <Text style={styles.label}>📆 Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>
            {date.toISOString().slice(0, 10)}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>⏰ Time</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.buttonText}>
            {time.toTimeString().slice(0, 5)}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        <Text style={styles.label}>👥 People</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of people"
          value={people}
          onChangeText={setPeople}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 24, backgroundColor: "#28a745" }]}
          onPress={handleCreateReservation}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            ✅ Reserve
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CreateReservationScreen;
