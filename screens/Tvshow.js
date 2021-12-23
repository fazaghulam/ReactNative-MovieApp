import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Search from "../assets/search.svg";
import Close from "../assets/close.svg";
import { FlatGrid } from "react-native-super-grid";
import Card from "../components/Card";
import MenuBar from "../components/MenuBar";
import { baseUrl, api } from "../config";

const init = [
  { name: "Action & Adventure", id: 10759, active: true },
  { name: "Animation", id: 16, active: false },
  { name: "Crime", id: 80, active: false },
  { name: "Drama", id: 18, active: false },
  { name: "Family", id: 10751, active: false },
  { name: "Mystery", id: 9648, active: false },
  { name: "Sci-Fi & Fantasy", id: 10765, active: false },
  { name: "War & Politics", id: 10768, active: false },
];

export default function Tvshow({ navigation }) {
  const [genre, setGenre] = useState(init);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genreId, setGenreId] = useState(10759);
  const [tvshow, setTvshow] = useState([]);
  const [tvshowSearch, setTvshowSearch] = useState([]);
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
    axios.get(baseUrl + "/discover/tv" + api + "&sort_by=popularity.asc&page=1&with_genres=" + genreId).then((response) => {
      setTvshow(response.data.results);
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
      .get(baseUrl + "/search/tv" + api + "&query=" + search)
      .then((response) => {
        setTvshowSearch(response.data.results);
      })
      .catch(() => setTvshowSearch([]));
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your favourite TV Show reviews, rating, and more</Text>
      <View style={{ position: "relative", paddingHorizontal: 20 }}>
        <View style={styles.searchSection}>
          <Search />
          <TextInput
            onBlur={() => setSearchFocus(false)}
            onFocus={() => setSearchFocus(true)}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="search tv show"
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
        {tvshowSearch.length == 0 && (
          <View style={{ height: 25 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {genre.map((list, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleCategory(idx, list.id)}>
                  <Text style={list.active ? styles.textactive : styles.text}>{list.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <FlatGrid
        style={styles.gridView}
        spacing={10}
        data={tvshowSearch.length > 0 ? tvshowSearch : tvshow}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetailTv", { data: item })}>
            <Card title={item.name} poster={item.poster_path} />
          </TouchableOpacity>
        )}
      />
      <MenuBar state="1" setFilm={() => navigation.navigate("Movies")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#16151E",
    position: "relative",
  },
  dropdown: {
    width: "80%",
    maxHeight: 100,
    backgroundColor: "#322D48",
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: "absolute",
    zIndex: 1,
    top: 80,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 22,
    paddingHorizontal: 20,
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
