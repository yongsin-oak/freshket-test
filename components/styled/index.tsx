import styled from "@emotion/native";

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding-inline: 16px;
  padding-block: 48px;
`;

interface FlexProps {
  justify?:
    | "center"
    | "space-between"
    | "space-around"
    | "flex-start"
    | "flex-end";
  align?: "center" | "flex-start" | "flex-end";
  gap?: number;
}

export const Flex = styled.View<FlexProps>`
  flex-direction: row;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "center"};
  gap: ${(props) => props.gap || 0}px;
`;
