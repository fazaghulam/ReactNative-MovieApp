import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Film from "../assets/film.svg";
import Tvshow from "../assets/tvshow.svg";
import FilmActive from "../assets/film_active.svg";
import TvshowActive from "../assets/tvshow_active.svg";

export default function MenuBar({ state, setFilm, setTvshow }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={setFilm} style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        {state == 0 ? <FilmActive /> : <Film />}
      </TouchableOpacity>
      <TouchableOpacity onPress={setTvshow} style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        {state == 1 ? <TvshowActive /> : <Tvshow />}
      </TouchableOpacity>
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
