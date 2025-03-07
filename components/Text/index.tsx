import { type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";

export type ThemedTextProps = TextProps & {
  children?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  fontSize?: number;
  bold?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  textAlign?: "right" | "center" | "left";
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  s1?: boolean;
  s2?: boolean;
  s3?: boolean;
  color?: string;
};

const RNText = styled.Text<ThemedTextProps>`
  ${({
    fontSize,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    s1,
    s2,
    s3,
    textAlign,
    color,
    bold,
    medium,
    semiBold,
  }) => {
    return `
    font-weight: ${
      bold ? "bold" : medium ? "500" : semiBold ? "600" : "normal"
    };
    font-size: ${
      h1
        ? "28px"
        : h2
        ? "24px"
        : h3
        ? "22px"
        : h4
        ? "20px"
        : h5
        ? "18px"
        : h6
        ? "16px"
        : s1
        ? "14px"
        : s2
        ? "12px"
        : s3
        ? "10px"
        : fontSize
        ? fontSize + "px"
        : "12px"
    };
    text-align: ${textAlign};
    color: ${color};
    `;
  }}
`;
const Text = ({
  children,
  style,
  color,
  lightColor,
  darkColor,
  ...props
}: ThemedTextProps): JSX.Element => {
  const customTheme = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <RNText color={color ? color : customTheme} style={style} {...props}>
      {children}
    </RNText>
  );
};
export default Text;
