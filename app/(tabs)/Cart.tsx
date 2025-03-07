import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "@/components/styled";
import { useCart } from "@/components/context/cart";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";

export default function Cart() {
  const {
    state: { cart },
  } = useCart();
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text h2>Empty Cart</Text>
          <Button text="Go to shopping"></Button>
        </View>
      ) : (
        <ProductCards products={cart} />
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
});
