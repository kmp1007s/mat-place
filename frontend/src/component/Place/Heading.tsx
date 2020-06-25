import styled from "lib/styled";

const Heading = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.color.GRAY};
  font-weight: 900;
  padding: 48px 0px;
  margin-bottom: 32px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 100%;

  &::before {
    position: absolute;
    display: block;
    content: "";
    background-color: ${(props) => props.theme.color.PRIMARY_LIGHT};
    width: 280px;
    height: 5px;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default Heading;
