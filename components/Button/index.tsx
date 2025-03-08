import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Text, { ThemedTextProps } from "../Text";

interface Props extends TouchableOpacityProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  textProps?: ThemedTextProps;
}
const Button = ({ text, style, textProps, ...props }: Props) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.buttonText} {...textProps}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#65558F",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default Button;
