import styled from "lib/styled";

type ButtonProps = {
  full?: boolean;
};

const Button = styled.button<ButtonProps>`
  border: 1px solid ${(props) => props.theme.color.PRIMARY};
  background-color: transparent;
  color: ${(props) => props.theme.color.PRIMARY};
  padding: 8px;
  border-radius: 3px;
  font-size: 1rem;
  width: ${(props) => (props.full ? "90%" : "auto")};
  margin: 1rem;
  transition: all 1s;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.color.PRIMARY_LIGHT};
    border: 1px solid transparent;
    color: ${(props) => props.theme.color.WHITE_LIGHT};
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
