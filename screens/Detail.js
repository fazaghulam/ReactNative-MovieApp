import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import Clock from "../assets/clock.svg";
import Card from "../components/Card";
import axios from "axios";
import { baseUrl, api } from "../config";

export default function Detail({ navigation, route }) {
  const data = route.params.data;
  const [related, setRelated] = useState([]);
  const [genre, setGenre] = useState([]);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    axios.get(baseUrl + "/movie/" + data.id + api).then((response) => {
      setGenre(response.data.genres.map((a) => a.name));
      setDuration(response.data.runtime);
    });

    axios.get(baseUrl + "/movie/" + data.id + "/recommendations" + api).then((response) => {
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
            <Text style={styles.title}>{data.title}</Text>
            <View style={{ flexDirection: "row", marginBottom: 23 }}>
              <Clock />
              <Text style={[styles.subText, { marginLeft: 5 }]}>{duration ? duration + " minutes" : "-"}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 23 }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>Release Date</Text>
                <Text style={styles.subText}>{data.release_date ? data.release_date : "-"}</Text>
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
            <View style={{ marginBottom: 23 }}>
              <Text style={styles.text}>Synopsis</Text>
              <Text style={styles.subText}>{data.overview ? data.overview : "-"}</Text>
            </View>
            <Text style={[styles.text, { marginBottom: 5 }]}>Related Movies</Text>
            {related.length == 0 && <Text style={styles.subText}>no related movies found</Text>}
          </>
        }
        style={styles.gridView}
        spacing={10}
        data={related}
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
