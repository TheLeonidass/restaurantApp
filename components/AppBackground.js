import React from "react";
import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const AppBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: height,
    width: width,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
});

export default AppBackground;
