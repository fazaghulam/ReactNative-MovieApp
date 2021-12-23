import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Search from "../assets/search.svg";
import Close from "../assets/close.svg";
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

export default function Movies({ navigation }) {
  const [genre, setGenre] = useState(init);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genreId, setGenreId] = useState(28);
  const [movie, setMovie] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);

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

  useEffect(() => {
    axios
      .get(baseUrl + "/search/keyword" + api + "&query=" + search)
      .then((response) => {
        setSuggestion(response.data.results);
      })
      .catch(() => setSuggestion([]));

    axios
      .get(baseUrl + "/search/movie" + api + "&query=" + search)
      .then((response) => {
        setMovieSearch(response.data.results);
      })
      .catch(() => setMovieSearch([]));
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your favourite movie reviews,</Text>
      <Text style={styles.title}>rating, and more</Text>
      <View style={{ position: "relative" }}>
        <View style={styles.searchSection}>
          <Search />
          <TextInput
            onBlur={() => setSearchFocus(false)}
            onFocus={() => setSearchFocus(true)}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="search movies"
            placeholderTextColor="#626262"
            value={search}
            onChangeText={(text) => handleSearch(text)}
          />
          <TouchableOpacity onPress={() => setSearch("")}>
            <Close />
          </TouchableOpacity>
        </View>
        {suggestion.length > 0 && searchFocus && (
          <View style={styles.dropdown}>
            <ScrollView>
              {suggestion.map((list, idx) => (
                <TouchableOpacity key={idx} onPress={() => setSearch(list.name)}>
                  <Text style={{ color: "white" }}>{list.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {movieSearch.length == 0 && (
          <View style={{ height: 25 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {genre.map((list, i) => (
                <Text key={i} style={list.active ? styles.textactive : styles.text} onPress={() => handleCategory(i, list.id)}>
                  {list.name}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <FlatGrid
        style={styles.gridView}
        spacing={10}
        data={movieSearch.length > 0 ? movieSearch : movie}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", { data: item })}>
            <Card title={item.title} poster={item.poster_path} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#16151E",
    position: "relative",
  },
  dropdown: {
    width: "80%",
    maxHeight: 100,
    backgroundColor: "#322D48",
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: "absolute",
    zIndex: 1,
    top: 80,
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
    width: "90%",
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
