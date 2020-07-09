import styled from "lib/styled";
import Input from "component/Common/Input";

const StyledInput = styled(Input)`
  color: ${(props) => props.theme.color.WHITE};
  border-color: ${(props) => props.theme.color.WHITE};
  height: 31px;
  margin: 0;
  display: block;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.color.GRAY_LIGHT};
  }

  &:focus {
    color: ${(props) => props.theme.color.WHITE_LIGHT};
    border-color: ${(props) => props.theme.color.WHITE_LIGHT};

    &::placeholder {
      color: ${(props) => props.theme.color.WHITE_LIGHT};
    }
  }
`;

export default StyledInput;
