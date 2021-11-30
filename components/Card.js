import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Card({ title, year }) {
  return (
    <View style={{ width: 120 }}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/queen.jpg")} />
      </View>
      <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>Queens Gambit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 160,
    elevation: 5,
    borderRadius: 10,
    shadowColor: "white",
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
