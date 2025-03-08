import { ThemedText } from "@/components/ThemedText";
import { Flex, ScrollView } from "@/components/styled";
import { useCart } from "@/components/context/cart";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";

export default function Cart() {
  const {
    state: { cart },
  } = useCart();
  console.log(cart);
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={cart.length === 0 && styles.contentContainerStyle}
    >
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text h2>Empty Cart</Text>
          <Button text="Go to shopping"></Button>
        </View>
      ) : (
        <View>
          <ProductCards products={cart} />
          <View style={{ ...styles.footer, backgroundColor: theme.primary200 }}>
            <Flex></Flex>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 10,
    marginVertical: 5,
    bottom: 0,
    position: "fixed",
    height: 170,
    marginInline: -16,
  },
});
