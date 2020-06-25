import styled, { ThemeProps } from "lib/styled";
import { css } from "@emotion/core";

type Props = {
  padding?: boolean | number;
};

const dynamicPadding = (props: Props & ThemeProps) => {
  if (typeof props.padding === "number")
    return css`
      padding: ${props.padding}px 0px;
    `;
  else if (props.padding)
    return css`
      padding: 32px 0px;
    `;
  else
    return css`
      padding: 0;
    `;
};

const Flex = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  ${dynamicPadding}
`;

export default Flex;
