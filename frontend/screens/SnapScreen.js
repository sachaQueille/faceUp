import React, { useState, useEffect, createRef } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { Button, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

const SnapScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const changeFlash = () => {
    if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.off);
    } else {
      setFlash(Camera.Constants.FlashMode.on);
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true,
      });
      let data = new FormData();

      data.append("avatar", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "user_avatar.jpg",
      });

      const response = await fetch("http://192.168.0.30:3000/upload", {
        method: "post",
        body: data,
      });
      const resJSON = await response.json();
      setVisible(true);

      dispatch({
        type: "add-picture",
        picture: resJSON.pictureSaved.url,
        age: resJSON.age,
        gender: resJSON.gender,
      });
    }
  };

  let cameraRef = createRef(null);

  return (
    <View style={{ flex: 1 }}>
      {hasPermission && (
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flash}
          ref={(ref) => (cameraRef = ref)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <IconIonic name="camera-reverse" size={20} color="#ffffff" />
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => changeFlash()}
            >
              <IconFontAwesome name="flash" size={20} color="#ffffff" />
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flash{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            buttonStyle={{ backgroundColor: "#009788" }}
            icon={
              <Icon
                name="save"
                size={24}
                color="white"
                style={{ marginRight: 6 }}
              />
            }
            title="Snap"
            onPress={takePicture}
          />
        </Camera>
      )}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>loading...</Text>
      </Overlay>
    </View>
  );
};

export default SnapScreen;
