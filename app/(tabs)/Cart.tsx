import { ThemedText } from "@/components/ThemedText";
import { Flex, ScrollView } from "@/components/styled";
import { useCart } from "@/components/context/cart";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

interface CartAddDiscount {
  [key: string]: number | string;
  discount: number;
  id: string;
  name: string;
  price: number;
  quantity: number;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
}
export default function Cart() {
  const {
    state: { cart },
  } = useCart();
  const theme = useTheme();
  const [cartAddDiscount, setCartAddDiscount] = useState<CartAddDiscount[]>([]);
  console.log(cart);
  const discountCal = () => {
    const cartCal = cart.map((item) => {
      const { quantity, price } = item;
      const pairs = (quantity / 2) | 0;
      const discount = pairs ? pairs * price * 0.05 : 0;
      const priceAfterDiscount = price * quantity - discount;
      return {
        ...item,
        priceAfterDiscount,
        discount,
        priceBeforeDiscount: price * quantity,
      };
    });
    return setCartAddDiscount(cartCal);
  };
  const summary = (key: string) => {
    return Number(
      cartAddDiscount.reduce((acc, cur) => acc + Number(cur[key]), 0)
    ).toLocaleString("th-Th", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  useFocusEffect(
    useCallback(() => {
      discountCal();
    }, [cart])
  );
  const FlexFooter: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Flex justify="space-between">{children}</Flex>;
  const TextFooter: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <Text h6 color={theme.primary200}>
      {children}
    </Text>
  );
  return (
    <View style={styles.containerMain}>
      <ScrollView
        contentContainerStyle={
          cart.length === 0 && styles.contentContainerStyle
        }
      >
        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text h2>Empty Cart</Text>
            <Button
              text="Go to shopping"
              onPress={() => router.navigate("/")}
            />
          </View>
        ) : (
          <ProductCards swipeDelete products={cart} />
        )}
      </ScrollView>
      <View
        style={{
          ...styles.footer,
          backgroundColor: theme.backgroundContainer,
        }}
      >
        <FlexFooter>
          <TextFooter>Subtotal</TextFooter>
          <TextFooter>{summary("priceBeforeDiscount")}</TextFooter>
        </FlexFooter>
        <FlexFooter>
          <TextFooter>Promotion discount</TextFooter>
          <Text h6 color={theme.error}>
            {Number(summary("discount")) > 0
              ? "-" + summary("discount")
              : summary("discount")}
          </Text>
        </FlexFooter>
        <Flex
          justify="space-between"
          align="center"
          style={styles.summaryPrice}
        >
          <Text h4 color={theme.primary200}>
            {summary("priceAfterDiscount")}
          </Text>
          <Button text="Checkout" style={styles.checkoutButton} />
        </Flex>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  contentContainerStyle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 16,
    position: "fixed",
    bottom: 0,
    height: 170,
    gap: 16,
  },
  summaryPrice: {
    marginTop: 8,
  },
  checkoutButton: {
    borderRadius: 20,
  },
});
