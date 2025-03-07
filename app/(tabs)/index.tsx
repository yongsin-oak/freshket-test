import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Flex, ScrollView } from "@/components/styled";
import request from "@/utils/request";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { router } from "expo-router";
import { useCart } from "@/components/context/cart";

interface RecommendProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Shopping() {
  const [recommendProduct, setRecommendProduct] = useState<RecommendProduct[]>(
    []
  );
  const onGetRecommendProduct = async () => {
    try {
      const res = await request.get("/recommended-products");
      setRecommendProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     onGetRecommendProduct();
  //   }, [])
  // );
  useEffect(() => {
    onGetRecommendProduct();
  }, []);
  return (
    <ScrollView>
      <Flex justify="space-between">
        <Text bold h2>
          Recommend Product
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/Cart")}>
          <Text h6>Cart</Text>
        </TouchableOpacity>
      </Flex>
      <ProductCards products={recommendProduct} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
