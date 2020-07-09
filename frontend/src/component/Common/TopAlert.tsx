import React, { ReactNode } from "react";
import styled from "lib/styled";
import { keyframes } from "@emotion/core";

import { AiFillCloseCircle } from "react-icons/ai";

const topSlide = keyframes`
  0% {
    transform: translate(-50%, -15%);
  }
  100% {
    transform: translate(-50%, 0%);   
  }
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  padding: 16px;
  background-color: ${(props) => props.theme.color.WHITE};
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0%);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  animation: ${topSlide} 0.8s ease;
`;

const CloseBtn = styled(AiFillCloseCircle)`
  position: relative;
  left: 93%;
  color: ${(props) => props.theme.color.BLACK_LIGHT};
  transition: all 0.3s ease;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.color.RED};
  }
`;

type Props = {
  children: ReactNode;
  onClose: Function;
};

function TopAlert(props: Props) {
  return (
    <Wrapper>
      <div>
        <CloseBtn
          size={26}
          onClick={(e) => {
            props.onClose();
          }}
        />
      </div>
      {props.children}
    </Wrapper>
  );
}

export default TopAlert;
