import styled from "styled-components";
import { media } from "@styles/utils";

interface IFlexBox {
  direction: "row" | "row-reverse" | "column" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
}

 const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props: IFlexBox) => props.direction};
  flex-wrap: ${(props: IFlexBox) => props.wrap};
  align-items: ${(props: IFlexBox) => props.alignItems};
  ${media.phone`flex-direction:column`}
`;
export default FlexBox