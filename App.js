import React from "react";
import { AppRegistry } from "react-native";
import { startNetworkLogging } from "react-native-network-logger";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./screens/Detail";
import Movies from "./screens/Movies";
import Tvshow from "./screens/Tvshow";

startNetworkLogging();
AppRegistry.registerComponent("App", () => App);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Tvshow" component={Tvshow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
