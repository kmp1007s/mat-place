import styled from "lib/styled";

const FieldText = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 1.4rem;
  margin-right: 16px;
  color: ${(props) => props.theme.color.WHITE};
  width: 110px;
  vertical-align: middle;
`;

export default FieldText;
