import {
  Image,
  StyleSheet,
  Platform,
  Touchable,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "@/components/styled";
import { router } from "expo-router";
import request from "@/utils/request";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Shopping() {
  // const onGetRecommendProduct = () => {
    
  // };
  // useFocusEffect(() => {
  //   React.useCallback(() => {
  //     onGetRecommendProduct();
  //   }, []);
  // });
  return (
    <ScrollView style={{ flexDirection: "column" }}>
      <ThemedText type="subtitle">Recommend Product</ThemedText>
      <View>
        <View style={styles.productsImg}></View>
        <View>
          <View style={{ flexDirection: "column" }}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsImg: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: "red",
  },
});
