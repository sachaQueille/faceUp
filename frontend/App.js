import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SnapScreen from "./screens/SnapScreen";
import GalleryScreen from "./screens/GalleryScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import pictures from "./reducers/pictures";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ pictures }));

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Snap") {
            iconName = "camera";
          } else if (route.name === "Gallery") {
            iconName = "images";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        style: {
          backgroundColor: "#111224",
        },
      }}
    >
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
