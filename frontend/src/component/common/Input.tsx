import styled from "lib/styled";

type InputProps = {
  full?: boolean;
};

const Input = styled.input<InputProps>`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY};
  background-color: transparent;
  position: relative;
  width: ${(props) => (props.full ? "90%" : "auto")};
  margin: 1rem;
  padding: 0.3rem;
  font-size: 1rem;
  transition: all 1s;
  color: ${(props) => props.theme.color.GRAY_DARK};

  &::placeholder {
    padding-left: 0;
    transition: padding 0.2s;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.color.PRIMARY_LIGHT};
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
    transition: all 0.4s;

    &::placeholder {
      color: ${(props) => props.theme.color.PRIMARY_LIGHT};
      padding-left: 4px;
      transition: padding 0.2s;
    }
  }
`;

export default Input;
