import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import Card from "../components/Card";
import axios from "axios";
import { baseUrl, api } from "../config";

export default function DetailTv({ navigation, route }) {
  const data = route.params.data;
  const [related, setRelated] = useState([]);
  const [genre, setGenre] = useState([]);
  const [firstDate, setFirstDate] = useState("");
  const [episode, setEpisode] = useState("");
  const [season, setSeason] = useState("");

  useEffect(() => {
    axios.get(baseUrl + "/tv/" + data.id + api).then((response) => {
      setGenre(response.data.genres.map((a) => a.name));
      setFirstDate(response.data.first_air_date);
      setEpisode(response.data.number_of_episodes);
      setSeason(response.data.number_of_seasons);
    });

    axios.get(baseUrl + "/tv/" + data.id + "/recommendations" + api).then((response) => {
      setRelated(response.data.results);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          source={
            (data.backdrop_path && { uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}` }) || {
              uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
            }
          }
        />
      </View>
      <FlatGrid
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{data.name}</Text>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>First Release Date</Text>
                <Text style={styles.subText}>{firstDate ? firstDate : "-"}</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>Genre</Text>
                <View style={{ flexDirection: "row" }}>
                  {genre.map((list, idx) => (
                    <Text key={idx} style={styles.subText}>
                      {(idx ? ", " : "") + list}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.text}>Number of Season: {season ? season : "-"}</Text>
            <Text style={styles.text}>Number of Episode: {episode ? episode : "-"}</Text>
            <View style={{ marginBottom: 23, marginTop: 10 }}>
              <Text style={styles.text}>Synopsis</Text>
              <Text style={styles.subText}>{data.overview ? data.overview : "-"}</Text>
            </View>
            <Text style={[styles.text, { marginBottom: 5 }]}>Related Tv Show</Text>
            {related.length == 0 && <Text style={styles.subText}>no related tv show found</Text>}
          </>
        }
        style={styles.gridView}
        spacing={10}
        data={related}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetailTv", { data: item })}>
            <Card title={item.name} poster={item.poster_path} />
          </TouchableOpacity>
        )}
      />
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
  gridView: {
    paddingTop: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    flex: 1,
  },
});
