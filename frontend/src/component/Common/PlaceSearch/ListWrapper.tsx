import styled from "lib/styled";
import { keyframes } from "@emotion/core";

const heightSlide = keyframes`
  0% {transform: scale(0.85) translateY(-15%);}
  100% {transform: scale(1.0) translateY(0%);}
`;

const ListWrapper = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${(props) => props.theme.color.WHITE};
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  max-height: 140px;
  overflow-y: auto;
  z-index: 995;
  animation: ${heightSlide} 0.2s ease;
`;

export default ListWrapper;
