import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import ErrorIcon from "@/assets/icon/Error";

interface Props {
  refresh: () => void;
}
export default function ErrorPage({ refresh }: Props) {
  return (
    <View>
      <View style={styles.emptyCart}>
        <ErrorIcon />
        <Text h2>Something went wrong</Text>
        <Button text="Refresh" onPress={refresh}></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
    paddingBlock: 32,
  },
});
