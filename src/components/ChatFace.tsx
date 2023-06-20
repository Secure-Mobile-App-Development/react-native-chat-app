import { View, Text, StyleSheet } from "react-native";
import { useCallback } from "react";
import React from "react";
import { Image } from "expo-image";
import Contacts from "../../assets/dummy-data/contacts.json";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function ChatFace(props) {
  const [fontsLoaded] = useFonts({
    "RobotoMedium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "RobotoRegular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "PoppinsLight": require("../../assets/fonts/Poppins-Light.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const checkContacts = (phNumber) => {
    if (Contacts.hasOwnProperty(props.data.phoneNumber))
      return Contacts[props.data.phoneNumber];
    return phNumber;
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.chatFace} onLayout={onLayoutRootView}>
      <View style={styles.profileBorder}>
        <Image
          style={styles.image}
          source={props.data.profileImage}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.chatContactInfo}>
        <View style={styles.chatTitleStyle}>
          <Text style={{fontFamily: "RobotoMedium", fontSize: 25}}>{checkContacts(props.data.phoneNumber)}</Text>
          <Text style={{fontFamily: "RobotoRegular", fontSize: 15}}>{props.data.time}</Text>
        </View>
        <Text style={{fontFamily: "PoppinsLight", fontSize: 17}}>{props.data.message !== "" ? props.data.message : `Start a conversation with ${checkContacts(props.data.phoneNumber)}` }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatFace: {
    flexDirection: "row",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileBorder: {
    borderColor: "#0496FF",
    borderWidth: 5,
    borderRadius: 200,
    marginRight: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 3,
    backgroundColor: "#055",
  },
  chatTitleStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatContactInfo: {
    flex: 1,
    justifyContent: "center",
  },
});
