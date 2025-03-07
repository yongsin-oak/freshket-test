import styled from "@emotion/native";

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding-inline: 16px;
  padding-block: 48px;
`;

interface FlexProps {
  justify?: string;
  align?: string;
}

export const Flex = styled.View<FlexProps>`
  flex-direction: row;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "center"};
`;
