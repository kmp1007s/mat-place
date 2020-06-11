import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

import * as color from "schema/colors";

import Input from "component/common/Input";
import Button from "component/common/Button";

import { AiOutlineDoubleRight } from "react-icons/ai";

const slideFromRight = keyframes`
  from {
    transform: translateX(18px);
  } to {
    transform: translateX(0);
  }
`;

const slideFromTopWithFade = keyframes`
  from {
    transform: translateY(-18px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const widthFlip = keyframes`
  from {
    width: 40%;
  } to {
    width: 90%;
  }
`;

export const RootContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: ${color.PRIMARY_LIGHT};

  & > * {
    flex-basis: 100%;
  }
`;

export const TitleText = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: ${color.WHITE_LIGHT};
  user-select: none;
`;

export const SubTitleText = styled.span`
  text-align: center;
  display: block;
  font-size: 1.8rem;
  font-weight: 300;
  color: ${color.WHITE_LIGHT};
  user-select: none;
  margin-bottom: 32px;
`;

export const Bold = styled.span`
  font-weight: 700;
  margin: 0 8px;
`;

export const InputBox = styled.div`
  background-color: ${color.WHITE_LIGHT};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${color.GRAY_LIGHT};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  flex-basis: 600px;
  position: relative;
`;

export const ModeText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: ${color.BLACK_LIGHT};
  user-select: none;
  animation: ${slideFromRight} 1s ease;
`;

export const FieldText = styled.div`
  padding-left: 6px;
  align-self: start;
  color: ${color.GRAY};
  user-select: none;
  animation: ${slideFromTopWithFade} 1s ease;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 32px;
  opacity: 1;
  animation: ${slideFromTopWithFade} 1.4s ease;
`;

export const StyledButton = styled(Button)`
  animation: ${widthFlip} 1s ease;
  overflow: hidden;
`;

export const TransitionButton = styled(AiOutlineDoubleRight)`
  color: ${color.SECONDARY_DARK};
  height: 32px;
  width: 32px;
  position: absolute;
  right: 12px;

  &:hover {
    transform: scale(1.03);
    transition: all 0.6s;
  }
`;
