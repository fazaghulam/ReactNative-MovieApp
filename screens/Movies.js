import React, { useEffect, useState } from "react";
import NetworkLogger from "react-native-network-logger";
import axios from "axios";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import Search from "../assets/search.svg";
import { FlatGrid } from "react-native-super-grid";
import Card from "../components/Card";
import { baseUrl, api } from "../config";

const init = [
  { name: "Action", id: 28, active: true },
  { name: "Adventure", id: 12, active: false },
  { name: "Animation", id: 16, active: false },
  { name: "Comedy", id: 35, active: false },
  { name: "Drama", id: 18, active: false },
  { name: "Horror", id: 27, active: false },
  { name: "Romance", id: 10749, active: false },
];

const movies = [
  { title: "squid game" },
  { title: "bird box" },
  { title: "queens gambit" },
  { title: "dare devil" },
  { title: "money heist" },
  { title: "prison break" },
  { title: "prison break" },
  { title: "prison break" },
  { title: "prison break" },
];

export default function Movies() {
  const [genre, setGenre] = useState(init);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genreId, setGenreId] = useState(28);
  const [movie, setMovie] = useState([]);

  console.log(movie);

  const handleCategory = (i, id) => {
    genre.map((list) => setGenre([...genre, (list.active = false)]));
    setGenre([...genre, (genre[i].active = true)]);
    setGenreId(id);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    axios.get(baseUrl + "/discover/movie" + api + "&sort_by=popularity.asc&page=1&with_genres=" + genreId).then((response) => {
      setMovie(response.data.results);
    });
  }, [genreId]);

  /* things todo: create keyword suggestion popup and activate this request */
  useEffect(() => {
    axios
      .get(baseUrl + "/search/keyword" + api + "&query=" + search)
      .then((response) => {
        setSuggestion(response.data.results);
      })
      .catch(() => setSuggestion([]));
  }, [search]);

  return (
    <View style={styles.container}>
      {/* <NetworkLogger /> */}
      <Text style={styles.title}>Find your favourite movie reviews,</Text>
      <Text style={styles.title}>rating, and more</Text>
      <View style={styles.searchSection}>
        <Search />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="search movies"
          placeholderTextColor="#626262"
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <View style={{ height: 25 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genre.map((list, i) => (
            <Text key={i} style={list.active ? styles.textactive : styles.text} onPress={() => handleCategory(i, list.id)}>
              {list.name}
            </Text>
          ))}
        </ScrollView>
      </View>
      <FlatGrid style={styles.gridView} spacing={10} data={movie} renderItem={({ item }) => <Card title={item.title} poster={item.poster_path} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#16151E",
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  searchSection: {
    marginVertical: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#322D48",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 10,
    height: 40,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 17,
    marginRight: 25,
  },
  textactive: {
    color: "#C07362",
    fontSize: 17,
    marginRight: 25,
  },
  FlatlistStyles: {
    flexWrap: "wrap",
  },
});
