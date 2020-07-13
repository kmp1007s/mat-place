import styled from "lib/styled";

const Date = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 500;
  vertical-align: middle;
  color: ${(props) => props.theme.color.GRAY_DARK};
`;

export default Date;
