import styled from "styled-components";

interface IFlexItem {
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
  flexBasis: string;
}

export const FlexItem = styled.span`
  align-self: ${(props: IFlexItem) => props.alignSelf};
  flex-basis:${(props: IFlexItem) => props.flexBasis}
  margin: 0 10px;
`;
export default FlexItem;
