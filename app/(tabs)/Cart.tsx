import { Flex, ScrollView } from "@/components/styled";
import { CartItem, useCart } from "@/components/context/cart";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import { Alert, StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import request from "@/utils/request";

interface CartAddDiscount extends CartItem {
  [key: string]: number | string;
  discount: number;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
}
export default function Cart() {
  const {
    state: { cart },
    cartContext: { clearCart },
  } = useCart();
  const theme = useTheme();
  const [cartAddDiscount, setCartAddDiscount] = useState<CartAddDiscount[]>([]);
  const [checkedout, setCheckedout] = useState<boolean>(false);
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
  const onPostCheckout = async () => {
    try {
      await request.post("/orders/checkout", {
        products: cart.flatMap((item) => item.id),
      });
      clearCart();
      setCheckedout(true);
    } catch (error: any) {
      Alert.alert("Checkout Failed", "Something went wrong.");
      throw error;
    }
  };
  const checkoutCart = () => {
    onPostCheckout();
  };
  useFocusEffect(
    useCallback(() => {
      discountCal();
    }, [cart])
  );
  useFocusEffect(
    useCallback(() => {
      setCheckedout(false);
    }, [])
  );
  return (
    <View style={styles.containerMain}>
      {cart.length > 0 ? (
        <>
          <ScrollView>
            <ProductCards swipeDelete products={cart} />
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
              <Button
                text="Checkout"
                style={styles.checkoutButton}
                onPress={checkoutCart}
              />
            </Flex>
          </View>
        </>
      ) : checkedout ? (
        <View style={styles.emptyCart}>
          <Text h2 color={theme.success}>
            Success!
          </Text>
          <Text h6 color={theme.success}>
            Thank you for shopping with us!
          </Text>
          <Button text="Shop again" onPress={() => router.navigate("/")} />
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Text h2>Empty Cart</Text>
          <Button text="Go to shopping" onPress={() => router.navigate("/")} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  footer: {
    padding: 16,
    position: "absolute",
    bottom: 0,
    height: 170,
    gap: 16,
    width: "100%",
  },
  summaryPrice: {
    marginTop: 8,
  },
  checkoutButton: {
    borderRadius: 20,
  },
});
