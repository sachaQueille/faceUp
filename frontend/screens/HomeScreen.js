import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <Input
        placeholder="Enter name"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Button
        buttonStyle={{ backgroundColor: "#009788" }}
        title="Go to Gallery"
        onPress={() => {
          navigation.navigate("BottomNavigator", { screen: "Gallery" });
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
