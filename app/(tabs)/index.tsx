import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "@/components/styled";
import request from "@/utils/request";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import ProductCards from "@/components/ProductCard";

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

  useFocusEffect(
    useCallback(() => {
      onGetRecommendProduct();
    }, [])
  );

  return (
    <ScrollView>
      <ThemedText type="subtitle">Recommend Product</ThemedText>
      <ProductCards products={recommendProduct} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
