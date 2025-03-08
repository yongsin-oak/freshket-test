// Text.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import Text, { ThemedTextProps } from "../";

describe("<Text />", () => {
  const renderComponent = (props: ThemedTextProps) =>
    render(<Text {...props}>Test Text</Text>);

  it("renders text with default font size and alignment", () => {
    const { getByText } = renderComponent({});
    const text = getByText("Test Text");
    
    expect(text).toBeTruthy();
    expect(text.props.style[0].fontSize).toBe(12);
    expect(text.props.style[0].textAlign).toBe("left");
  });

  it("applies font size for h1, h2, h3, etc.", () => {
    const { getByText } = renderComponent({ h1: true });
    const text = getByText("Test Text");

    expect(text.props.style[0].fontSize).toBe(28);
  });

  it("applies correct text alignment", () => {
    const { getByText } = renderComponent({ textAlign: "center" });
    const text = getByText("Test Text");

    expect(text.props.style[0].textAlign).toBe("center");
  });

  it("applies bold font weight when 'bold' prop is passed", () => {
    const { getByText } = renderComponent({ bold: true });
    const text = getByText("Test Text");

    expect(text.props.style[0].fontWeight).toBe("bold");
  });

  it("applies custom color when 'color' prop is passed", () => {
    const { getByText } = renderComponent({ color: "red" });
    const text = getByText("Test Text");
    expect(text.props.style[0].color).toBe("red");
  });
});
