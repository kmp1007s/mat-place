import React from "react";
import styled from "lib/styled";
import { PlaceList as TypePlaceList } from "api/place";
import Flex from "component/Common/Flex";
import * as dateUtil from "lib/dateUtil";
import FaceBook from "component/Common/FaceBook";
import Kakao from "component/Common/Kakao";

type Props = TypePlaceList & {
  showOwner?: boolean;
};

const PlaceListBox = styled(Flex)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1px;
  padding: 18px;
  width: 100%;

  & > * {
    flex: 100%;
    color: ${(props) => props.theme.color.BLACK_LIGHT};
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: ${(props) => props.theme.color.GRAY_DARK};
`;

const Place = styled.div``;

function PlaceList(props: Props) {
  return (
    <PlaceListBox>
      <Title>{props.title}</Title>
      {props.placeIds.map((placeId, idx) => (
        <Place key={idx}>{placeId}</Place>
      ))}
      {props.showOwner && <div>{props.userId}</div>}
      <div>
        <span>{dateUtil.format(props.createdAt)}</span>
        <Kakao />
        <FaceBook />
      </div>
    </PlaceListBox>
  );
}

export default PlaceList;
