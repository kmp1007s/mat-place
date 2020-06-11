import styled from "@emotion/styled";
import * as color from "schema/colors";

type ButtonProps = {
  full?: boolean;
};

const Button = styled.button<ButtonProps>`
  border: 1px solid ${color.SECONDARY};
  background-color: transparent;
  color: ${color.SECONDARY};
  padding: 8px;
  border-radius: 3px;
  font-size: 1rem;
  width: ${(props) => (props.full ? "90%" : "auto")};
  margin: 1rem;
  transition: all 1s;
  user-select: none;

  &:hover {
    background-color: ${color.SECONDARY};
    border: 1px solid transparent;
    color: ${color.WHITE_LIGHT};
    transition: all 0.4s;
  }

  &:focus {
    outline: none;
  }

  &:active {
    filter: brightness(78%);
  }
`;

export default Button;
