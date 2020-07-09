import styled from "lib/styled";

const PlaceListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  width: 38%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: auto;
  // border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 5px;
  margin-bottom: 32px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export default PlaceListWrapper;
