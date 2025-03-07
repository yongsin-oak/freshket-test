import React from "react";
import { Flex } from "../styled";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import Button from "../Button";

interface Props {
  products: {
    id: number;
    name: string;
    price: number;
  }[];
}
const ProductCards = ({ products }: Props) => {
  return (
    <>
      {products?.map((product) => (
        <Flex key={product.id} style={styles.card}>
          <Image
            source={{ uri: "https://placehold.co/76" }}
            style={styles.productImg}
          />
          <View style={styles.productInfo}>
            <Text h6 bold style={styles.productName}>
              {product.name}
            </Text>
            <Text s1 style={styles.productPrice}>
              {product.price.toFixed(2)} / unit
            </Text>
          </View>
          <Button text="Add to cart"></Button>
        </Flex>
      ))}
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
  button: {
    backgroundColor: "#65558F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default ProductCards;
