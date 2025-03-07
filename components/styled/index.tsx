import styled from "@emotion/native";

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-top: 48px;
`;

interface FlexProps {
  justify?: string;
}

export const Flex = styled.View<FlexProps>`
  flex-direction: row;
  justify-content: ${(props) => props.justify || "flex-start"};
`;
