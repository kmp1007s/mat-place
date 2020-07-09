import styled from "lib/styled";
import { keyframes } from "@emotion/core";

import Input from "component/Common/Input";
import Button from "component/Common/Button";

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
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  height: 100%;

  & > * {
    flex-basis: 100%;
  }
`;

export const TitleText = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
  color: ${(props) => props.theme.color.WHITE_LIGHT};
  user-select: none;
`;

export const SubTitleText = styled.span`
  text-align: center;
  display: block;
  font-size: 1.8rem;
  font-weight: 300;
  color: ${(props) => props.theme.color.WHITE_LIGHT};
  user-select: none;
  margin-bottom: 32px;
`;

export const Bold = styled.span`
  font-weight: 700;
  margin: 0 8px;
  color: inherit;
`;

export const InputBox = styled.div`
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  flex-basis: 600px;
  position: relative;
`;

export const ModeText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: ${(props) => props.theme.color.GRAY_DARK};
  user-select: none;
  animation: ${slideFromRight} 1s ease;
`;

export const FieldText = styled.div`
  padding-left: 36px;
  align-self: start;
  color: ${(props) => props.theme.color.GRAY_DARK};
  user-select: none;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 32px;
  opacity: 1;
  animation: ${slideFromTopWithFade} 1.4s ease;
  z-index: 2;
`;

export const StyledButton = styled(Button)`
  animation: ${widthFlip} 1s ease;
  overflow: hidden;
`;

export const TransitionButton = styled(AiOutlineDoubleRight)`
  color: ${(props) => props.theme.color.PRIMARY};
  height: 32px;
  width: 32px;
  position: absolute;
  // left: 550px;
  right: 12px;
  transition: all ease 0.6s;
  z-index: 1;

  &.register {
    transform: scaleX(-1);
    left: 12px;
    transition: all ease 0.6s;
  }
`;

export const Loading = styled.div`
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
  }
`;
