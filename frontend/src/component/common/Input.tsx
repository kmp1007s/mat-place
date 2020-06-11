import * as React from "react";
import styled from "@emotion/styled";
import * as color from "schema/colors";

interface PropType {
  type: string;
  placeholder?: string;
  className?: string;
  full?: boolean;
}

function Input(props: PropType) {
  const StyledInput = styled.input`
    border: 0;
    border-bottom: 1px solid ${color.GRAY};
    background-color: transparent;
    position: relative;
    width: ${props.full ? "90%" : "auto"};
    margin: 1rem;
    padding: 0.3rem;
    font-size: 1rem;
    transition: all 1s;

    &:focus {
      outline: none;
      border-bottom: 1px solid ${color.SECONDARY};
      color: ${color.SECONDARY};
      transition: all 0.4s;

      &::placeholder {
        color: ${color.SECONDARY};
      }
    }
  `;

  return <StyledInput {...props} />;
}

export default Input;
