import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";

interface Props {
  text: string;
}
const Button = ({ text }: Props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
export default Button;
