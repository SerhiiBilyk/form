import styled from "styled-components";

interface IFlexItem {
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
}

export const FlexItem = styled.span`
  align-self: ${(props: IFlexItem) => props.alignSelf};
  margin: 0 10px;
`;
export default FlexItem;
