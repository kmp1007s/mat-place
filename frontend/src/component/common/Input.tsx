import styled from "@emotion/styled";
import * as color from "schema/colors";

type InputProps = {
  full?: boolean;
};

const Input = styled.input<InputProps>`
  border: 0;
  border-bottom: 1px solid ${color.GRAY};
  background-color: transparent;
  position: relative;
  width: ${(props) => (props.full ? "90%" : "auto")};
  margin: 1rem;
  padding: 0.3rem;
  font-size: 1rem;
  transition: all 1s;

  &::placeholder {
    transition: padding 0.2 s;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${color.SECONDARY};
    color: ${color.SECONDARY};
    transition: all 0.4s;

    &::placeholder {
      color: ${color.SECONDARY};
      padding-left: 4px;
      transition: padding 0.2s;
    }
  }
`;

export default Input;