import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuBar from "./components/MenuBar";
import Detail from "./screens/Detail";
import Movies from "./screens/Movies";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MenuBar /> */}
      <Detail />
      {/* <Movies /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "red",
  },
});
