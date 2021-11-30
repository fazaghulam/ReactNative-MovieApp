import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MenuBar({ menu }) {
  const [state, setState] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    bottom: 0,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#2C2B37",
  },
  text: {
    color: "white",
  },
});
