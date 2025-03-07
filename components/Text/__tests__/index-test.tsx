// Text.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import Text, { ThemedTextProps } from "../index";

describe("<Text />", () => {
  const renderComponent = (props: ThemedTextProps) =>
    render(<Text {...props}>Test Text</Text>);

  it("renders the text with default font size and alignment", () => {
    const { getByText } = renderComponent({});
    const text = getByText("Test Text");
    expect(text).toBeTruthy();
    expect(text.props.style[0].fontSize).toBe(12); 
    expect(text.props.style[0].textAlign).toBeUndefined();
  });

  it("applies font size based on h1, h2, etc. props", () => {
    const { getByText } = renderComponent({ h1: true });
    const text = getByText("Test Text");
    expect(text.props.style[0].fontSize).toBe(28);
  });

  it("applies correct text alignment", () => {
    const { getByText } = renderComponent({ textAlign: "center" });
    const text = getByText("Test Text");
    expect(text.props.style[0].textAlign).toBe("center");
  });
});
