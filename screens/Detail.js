import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Clock from "../assets/clock.svg";
import Card from "../components/Card";

const synopsis =
  "A story of people who fail at life for various reasons, but suddenly receive a mysterious invitation to participate in a survival game to win more than 38 million US dollars. The game takes place at an isolated  island and the participants are locked up until there is a final winner. The story will incorporate popular children's games from the 1970s and 1980s of Korea, such as squid game";

export default function Detail() {
  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }} source={require("../assets/squid.jpeg")} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.title}>Squid Game</Text>
        <View style={{ flexDirection: "row", marginBottom: 23 }}>
          <Clock />
          <Text style={[styles.subText, { marginLeft: 5 }]}>152 minutes</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 23 }}>
          <View style={{ width: "50%" }}>
            <Text style={styles.text}>Release Date</Text>
            <Text style={styles.subText}>7 September 2021</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={styles.text}>Genre</Text>
            <Text style={styles.subText}>Action</Text>
          </View>
        </View>
        <View style={{ marginBottom: 23 }}>
          <Text style={styles.text}>Synopsis</Text>
          <Text style={styles.subText}>{synopsis}</Text>
        </View>
        <Text style={[styles.text, { marginBottom: 5 }]}>Related Movies</Text>
        <Card />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16151E",
  },
  detail: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  cover: {
    height: "30%",
  },
  title: {
    fontSize: 27,
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    color: "white",
  },
  subText: {
    fontSize: 12,
    color: "white",
  },
});
