import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Card, Badge } from "react-native-elements";
import { useSelector } from "react-redux";

const GalleryScreen = () => {
  const picturesGallery = useSelector((state) => state.pictures);
  console.log(picturesGallery);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <Text style={styles.titleText}>Gallery</Text>
        <Card>
          {picturesGallery.map((picture) => (
            <View key={picture.url}>
              <Card.Image
                source={{ uri: picture.url }}
                style={{ width: 300 }}
              />
              <Badge
                status="success"
                value={<Text style={{ color: "white" }}>{picture.gender}</Text>}
              ></Badge>
              <Badge
                status="success"
                value={<Text style={{ color: "white" }}>{picture.age}</Text>}
              ></Badge>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GalleryScreen;
