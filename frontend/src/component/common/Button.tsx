import * as React from "react";
import styled from "@emotion/styled";
import * as color from "schema/colors";

interface PropType {
  className?: string;
  children: string;
  full?: boolean;
}

function Button(props: PropType) {
  const StyledButton = styled.button`
    border: 1px solid ${color.SECONDARY};
    background-color: transparent;
    color: ${color.SECONDARY};
    padding: 8px;
    border-radius: 3px;
    font-size: 1rem;
    width: ${props.full ? "90%" : "auto"};
    margin: 1rem;
    transition: all 1s;

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

  return <StyledButton {...props} />;
}

export default Button;
