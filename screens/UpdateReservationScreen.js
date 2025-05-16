import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";

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
      const localDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setDate(localDate);
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
    <View style={styles.container}>
      <Text style={styles.title}>Update Reservation</Text>

      <Text style={styles.label}>📅 Date</Text>
      <Button
        title={formatLocalDate(date)}
        onPress={() => setShowDatePicker(true)}
      />
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
      <Button
        title={time.toTimeString().slice(0, 5)}
        onPress={() => setShowTimePicker(true)}
      />
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
        <Button title="Update" onPress={handleUpdate} />
        <View style={{ height: 10 }} />
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          color="gray"
        />
      </View>
    </View>
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
    marginBottom: 20,
    alignSelf: "center",
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonGroup: {
    marginTop: 30,
  },
  buttonSpacing: {
    height: 10,
  },
});

export default UpdateReservationScreen;
