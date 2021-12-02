import React, { useState } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { startNetworkLogging } from "react-native-network-logger";
import MenuBar from "./components/MenuBar";
import Detail from "./screens/Detail";
import Movies from "./screens/Movies";

startNetworkLogging();
AppRegistry.registerComponent("App", () => App);

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MenuBar /> */}
      {/* <Detail /> */}
      <Movies />
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
