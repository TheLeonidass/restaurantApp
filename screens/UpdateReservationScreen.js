import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppBackground from "../components/AppBackground";

const formatLocalDate = (date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

const UpdateReservationScreen = ({ route, navigation }) => {
  const { reservation } = route.params;
  const initialDate = new Date(reservation.date);

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(() => {
    const [hours, minutes] = reservation.time.split(":");
    const d = new Date();
    d.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return d;
  });
  const [people, setPeople] = useState(String(reservation.people_count));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hour = selectedTime.getHours();
      if (hour < 12 || hour > 22) {
        Alert.alert(
          "Invalid Time",
          "Please select a time between 12:00 and 22:00."
        );
        return;
      }
      const newTime = new Date();
      newTime.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0
      );
      setTime(newTime);
    }
  };

  const handleUpdate = async () => {
    if (!people || isNaN(people) || Number(people) < 2 || Number(people) > 8) {
      Alert.alert("Invalid Input", "Please enter between 2 and 8 people.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    const formattedDate = formatLocalDate(date);
    const formattedTime = time.toTimeString().slice(0, 5);

    try {
      await axios.put(
        `${API_URL}/api/reservations/${reservation.reservation_id}`,
        {
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
      Alert.alert("Success", "Reservation updated!");
      navigation.goBack();
    } catch (err) {
      console.log("Update error:", err);
      Alert.alert("Error", "Could not update reservation.");
    }
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Update Reservation</Text>

        <Text style={styles.label}>📅 Date</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerText}>{formatLocalDate(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.label}>⏰ Time</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.pickerText}>
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
          value={people}
          onChangeText={setPeople}
          placeholder="Number of people"
          keyboardType="numeric"
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>↩️ Cancel</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eee",
    marginTop: 14,
    marginBottom: 6,
  },
  pickerButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  buttonGroup: {
    marginTop: 30,
  },
  primaryButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: "#888",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UpdateReservationScreen;
