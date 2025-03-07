import { StyleSheet, Image, Platform, Text, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Flex, ScrollView } from "@/components/styled";
import { useCart } from "@/components/context/cart";

export default function Cart() {
  const cart = useCart();
  return (
    <ScrollView>
      <ThemedText>Cart</ThemedText>
      {cart.state.cart.map((product) => (
        <Flex key={product.id}>
          <ThemedText>{product.name}</ThemedText>
          <ThemedText>{product.price}</ThemedText>
          <ThemedText>{product.quantity}</ThemedText>
        </Flex>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
