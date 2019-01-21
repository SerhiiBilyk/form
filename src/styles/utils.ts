import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};
type IMedia = Record<
  string,
  (arg: TemplateStringsArray) => FlattenSimpleInterpolation
>;

// Iterate through the sizes and create a media template
export const media: IMedia = Object.keys(sizes).reduce(
  (acc, label) => {
    acc[label] = (...args) => {
      const str = args;
      return css`
        @media (max-width: ${sizes[label] / 16}em) {
          ${css`
            ${str}
          `}
        }
      `;
    };

    return acc;
  },
  {} as IMedia
);
export const clearfix = `
&::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const inputs = `
width:100%;
  font-size: 18px;

`;
