import React from "react";
import styled from "lib/styled";

type Props = {
  place: any;
};

const Wrapper = styled.li`
  list-style: none;

  & .placeName {
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 300;
    margin: 0;
    padding: 0;
    background-color: yellow;
    color: ${(props) => props.theme.color.BLACK_LIGHT};
  }
`;

function AddInputBoxPlaceItem(props: Props) {
  const { place } = props;

  return (
    <Wrapper>
      <span className="placeName">{place.place_name}</span>
    </Wrapper>
  );
}

export default AddInputBoxPlaceItem;
