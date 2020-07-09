import styled, { ThemeProps } from "lib/styled";
import { css } from "@emotion/core";

type ButtonProps = {
  full?: boolean;
  invert?: boolean;
};

const defaultStyle = (props: ButtonProps & ThemeProps) => css`
  border: 1px solid ${props.theme.color.PRIMARY};
  background-color: transparent;
  color: ${props.theme.color.PRIMARY};

  &:hover {
    background-color: ${props.theme.color.PRIMARY_LIGHT};
    border: 1px solid transparent;
    color: ${props.theme.color.WHITE_LIGHT};
    transition: all 0.4s ease;
  }
`;

const invertStyle = (props: ButtonProps & ThemeProps) => css`
  background-color: ${props.theme.color.WHITE};
  border: 1px solid transparent;
  color: ${props.theme.color.PRIMARY};

  &:hover {
    border: 1px solid ${props.theme.color.WHITE};
    background-color: transparent;
    color: ${props.theme.color.WHITE};
    transition: all 0.4s ease;
  }
`;

const Button = styled.button<ButtonProps>`
  padding: 5px 15px;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 400;
  width: ${(props) => (props.full ? "90%" : "auto")};
  margin: 16px;
  transition: all 1s ease;
  cursor: pointer;
  user-select: none;

  &:focus {
    outline: none;
  }

  &:active {
    filter: brightness(78%);
  }

  ${(props) => (props.invert ? invertStyle : defaultStyle)};
`;

export default Button;
