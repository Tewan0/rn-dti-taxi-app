import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  setTimeout(() => {
    router.replace("/calculator");
  }, 3000);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/taxiCar.png")}
          style={styles.imgTaxiCar}
        />
        <Text style={styles.txt1}>Taxi Meter</Text>
        <Text style={styles.txt2}>THAI FARE CALCULATOR</Text>
        <ActivityIndicator
          size="large"
          color="#039900"
          style={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt2: {
    fontSize: 12,
    fontFamily: "Prompt_700Bold",
    marginTop: 5,
    color: "#039900",
  },
  txt1: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Prompt_700Bold",
    marginTop: 10,
  },
  imgTaxiCar: {
    width: 150,
    height: 150,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "93%",
    height: "40%",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffca38",
    alignItems: "center",
    justifyContent: "center",
  },
});
