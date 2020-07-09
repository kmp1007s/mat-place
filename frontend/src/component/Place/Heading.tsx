import styled from "lib/styled";

const Heading = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  color: ${(props) => props.theme.color.BLACK_LIGHT};
  font-weight: 500;
  margin: 0;
  padding: 1% 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};

  & > p {
    font-size: 1.4rem;
    line-height: 1;
    margin: 24px;
  }

  & .subTitle {
    margin: 6px;
    font-size: 1.1rem;
    color: ${(props) => props.theme.color.GRAY};
  }

  & .userName {
    font-size: 1.7rem;
    font-weight: 600;
    margin: 6px;
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  }
`;

export default Heading;
