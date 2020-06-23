import * as React from "react";
import styled from "@emotion/styled";

export const LoadingContainer = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    z-index: 999;
    opacity: 1;
    color: white;
    font-size: 2.2rem;
    font-weight: 400;
  }
`;

type Props = {
  children: React.ReactNode;
};

function Loading(props: Props) {
  return <LoadingContainer>{props.children}</LoadingContainer>;
}

export default Loading;
