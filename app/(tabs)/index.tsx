import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "@/components/styled";
import request from "@/utils/request";
import React, { useEffect, useState } from "react";
import ProductCards from "@/components/ProductCard";
import Text from "@/components/Text";
import ErrorPage from "@/components/ErrorPage";
import _ from "lodash";
import { useTheme } from "@emotion/react";

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function Shopping() {
  const [recommendProduct, setRecommendProduct] = useState<Product[]>([]);
  const [latestProduct, setLatestProduct] = useState<Product[]>([]);
  const [loadingRecommend, setLoadingRecommend] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [isErrorRecommend, setIsErrorRecommend] = useState(false);
  const [isErrorLatest, setIsErrorLatest] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isAtEnd, setIsAtEnd] = useState(true);
  const [allCursor, setAllCursor] = useState<string[]>([]);
  const theme = useTheme();
  const onGetRecommendProduct = async () => {
    setLoadingRecommend(true);
    setIsErrorRecommend(false);
    try {
      const res = await request.get("/recommended-products");
      setRecommendProduct(
        res.data.map((item: Product) => ({ ...item, id: "1" + item.id }))
      );
    } catch (error) {
      console.log(error);
      setIsErrorRecommend(true);
    } finally {
      setLoadingRecommend(false);
    }
  };
  const onGetLatestProduct = async () => {
    !cursor && setLoadingLatest(true);
    setIsErrorLatest(false);
    setIsAtEnd(false);
    if (cursor === allCursor?.[(cursor?.length || 1) - 1]) {
      return;
    }
    try {
      const res = await request.get("/products", {
        params: {
          cursor,
        },
      });
      setLatestProduct((Prev) =>
        _.unionBy(
          Prev,
          res.data.items.map((item: Product) => ({
            ...item,
            id: "2" + item.id,
          })),
          "id"
        )
      );
      setCursor(res.data.nextCursor);
      setAllCursor((Prev) => [...Prev, cursor!]);
    } catch (error) {
      console.log(error);
      setIsErrorLatest(true);
    } finally {
      setLoadingLatest(false);
    }
  };
  useEffect(() => {
    onGetRecommendProduct();
  }, []);
  useEffect(() => {
    isAtEnd && onGetLatestProduct();
  }, [isAtEnd]);
  const content = (props: {
    isError: boolean;
    refresh: () => void;
    products: Product[];
    loading?: boolean;
  }) => {
    const { isError, refresh, products, loading } = props;
    return isError ? (
      <ErrorPage refresh={refresh} />
    ) : (
      <ProductCards products={products} loading={loading} />
    );
  };

  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY <= layoutHeight) {
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }
  };
  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <Text bold h2 style={styles.textHead}>
        Recommend Product
      </Text>
      {content({
        isError: isErrorRecommend,
        refresh: onGetRecommendProduct,
        products: recommendProduct,
        loading: loadingRecommend,
      })}
      <Text bold h2 style={styles.textHead}>
        Latest Products
      </Text>
      {content({
        isError: isErrorLatest,
        refresh: onGetLatestProduct,
        products: latestProduct,
        loading: loadingLatest,
      })}
      {isAtEnd && <ActivityIndicator size="large" color={theme.primary} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textHead: {
    marginBlock: 16,
  },
});
