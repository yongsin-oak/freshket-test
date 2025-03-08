import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useCart } from "../context/cart";
import { Flex } from "../styled";
import { useTheme } from "@emotion/react";

interface Props {
  products?: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }[];
  loading?: boolean;
  swipeDelete?: boolean;
}

const ProductCards = ({ products, loading, swipeDelete = false }: Props) => {
  const {
    cartContext: {
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      getQuantity,
      removeFromCart,
    },
  } = useCart();
  const theme = useTheme();

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <FlatList
          data={products}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(item) => `${item.id}${item.name}`}
          renderItem={({ item: product }) => {
            const translateX = new Animated.Value(0);

            const panResponder = PanResponder.create({
              onStartShouldSetPanResponder: () => swipeDelete,
              onPanResponderMove: (_, gestureState) => {
                if (swipeDelete && gestureState.dx < 0) {
                  translateX.setValue(gestureState.dx);
                }
              },
              onPanResponderRelease: (_, gestureState) => {
                if (swipeDelete) {
                  if (gestureState.dx < -50) {
                    Animated.spring(translateX, {
                      toValue: -100,
                      useNativeDriver: true,
                    }).start();
                  } else {
                    Animated.spring(translateX, {
                      toValue: 0,
                      useNativeDriver: true,
                    }).start();
                  }
                }
              },
            });

            return (
              <Animated.View
                style={[
                  styles.animatedContainer,
                  { transform: [{ translateX }] },
                ]}
                {...panResponder.panHandlers}
              >
                <Flex style={styles.card}>
                  <Image style={styles.productImg} />
                  <View style={styles.productInfo}>
                    <Text
                      h6
                      bold
                      style={styles.productName}
                      color=""
                      numberOfLines={1}
                    >
                      {product.name}
                    </Text>
                    <Text s1 style={styles.productPrice}>
                      {Number(product.price).toLocaleString("th-Th", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      / unit
                    </Text>
                  </View>

                  {getQuantity(product.id) > 0 ? (
                    <View style={styles.quantityWrapper}>
                      <Button
                        text="-"
                        onPress={() => decreaseQuantity(product.id)}
                        style={styles.updownButton}
                      />
                      <Text h6>{getQuantity(product.id)}</Text>
                      <Button
                        text="+"
                        onPress={() => increaseQuantity(product.id)}
                        style={styles.updownButton}
                      />
                    </View>
                  ) : (
                    <Button
                      text="Add to cart"
                      onPress={() => addToCart(product)}
                    />
                  )}
                </Flex>
                {swipeDelete && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeFromCart(product.id)}
                  >
                    <Text color="white" bold>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    position: "relative",
    marginVertical: 4,
  },
  card: {
    alignItems: "center",
    padding: 8,
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
    alignItems: "center",
  },
  updownButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 100,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -100,
  },
});

export default ProductCards;
