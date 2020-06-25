import styled from "lib/styled";

const UserId = styled.div`
  display: inline-block;
  font-size: 2.3rem;
  margin-left: 3%;
  margin-right: 1%;
  font-weight: 700;
  color: ${(props) => props.theme.color.WHITE_LIGHT};
  border-bottom: 5px solid ${(props) => props.theme.color.WHITE_LIGHT};
`;

export default UserId;
