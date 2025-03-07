import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Flex, ScrollView } from "@/components/styled";
import request from "@/utils/request";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { router } from "expo-router";
import ErrorPage from "@/components/ErrorPage";

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
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const onGetRecommendProduct = async () => {
    setLoading(true);
    try {
      const res = await request.get("/recommended-products");
      setRecommendProduct(res.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetRecommendProduct();
  }, []);
  const recommendedContent = isError ? (
    <ErrorPage refresh={onGetRecommendProduct} />
  ) : (
    <ProductCards products={recommendProduct} />
  );
  return (
    <ScrollView>
      <Text bold h2 style={styles.textHead}>
        Recommend Product
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        recommendedContent
      )}
      <Text bold h2 style={styles.textHead}>
        Latest Products
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textHead: {
    marginBlock: 16,
  },
});
