import styled from "lib/styled";

const ListItem = styled.li`
  list-style: none;
  display: block;
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  padding: 16px 0px 16px 10px;
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.PRIMARY_LIGHT};

    & .placeName,
    & .addressName {
      color: ${(props) => props.theme.color.WHITE};
    }
  }

  &.noResult {
    height: 100%;
    cursor: not-allowed;
    background-color: ${(props) => props.theme.color.RED};

    & > div {
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      color: ${(props) => props.theme.color.WHITE};
    }
  }

  & .placeName {
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
    color: ${(props) => props.theme.color.BLACK_LIGHT};
  }

  & .addressName {
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.3s ease;
    color: ${(props) => props.theme.color.GRAY};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default ListItem;
