import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useCart } from "../context/cart";
import { Flex } from "../styled";

interface Props {
  products?: {
    id: number;
    name: string;
    price: number;
    quantity?: number;
  }[];
  loading?: boolean;
  loadMoreProducts?: () => void;
}

const ProductCards = ({ products, loadMoreProducts, loading }: Props) => {
  const {
    cartContext: { addToCart, increaseQuantity, decreaseQuantity, getQuantity },
  } = useCart();
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(item) => `${item.id.toString()}${item.name}`}
          renderItem={({ item: product }) => (
            <Flex style={styles.card}>
              <Image style={styles.productImg} />
              <View style={styles.productInfo}>
                <Text h6 bold style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text s1 style={styles.productPrice}>
                  {product.price.toFixed(2)} / unit
                </Text>
              </View>

              {getQuantity(product.id) > 0 ? (
                <View style={styles.quantityWrapper}>
                  <Button
                    text="-"
                    onPress={() => decreaseQuantity(product.id)}
                  />
                  <Text h6>{getQuantity(product.id)}</Text>
                  <Button
                    text="+"
                    onPress={() => increaseQuantity(product.id)}
                  />
                </View>
              ) : (
                <Button text="Add to cart" onPress={() => addToCart(product)} />
              )}
            </Flex>
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  productImg: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: "#ddd",
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontWeight: "bold",
  },
  productPrice: {
    color: "gray",
    marginTop: 4,
  },
  quantityWrapper: {
    flexDirection: "row",
    gap: 8,
  },
});

export default ProductCards;
