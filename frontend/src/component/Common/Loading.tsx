import * as React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { GooeyLoader1 } from "react-loaders-kit";
import * as color from "schema/colors";

type Props = {
  background?: boolean;
  withText?: boolean;
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.95;
  }
`;

const backgroundChange = keyframes`
  0% {
    background-color: black;
  }
  100% {
    background-color: var(--primary_dark);
  }
`;

const LoadingContainer = styled.div<Props>`
  background-color: ${(props) => (props.background ? "black" : "transparent")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  animation: ${fadeIn} ease 3s infinite alternate,
    ${backgroundChange} ease 6s infinite alternate;
  opacity: 0;

  & > * {
    z-index: 999;
    color: white;
    font-size: 1.8rem;
    font-weight: 400;
    flex: 100%;
    width: auto;
    text-align: center;
  }
`;

function Loading(props: Props) {
  return (
    <LoadingContainer {...props}>
      <GooeyLoader1 loading color={color.WHITE} size={100} />
      {props.withText && <span>요청을 처리중입니다...</span>}
    </LoadingContainer>
  );
}

export default Loading;
