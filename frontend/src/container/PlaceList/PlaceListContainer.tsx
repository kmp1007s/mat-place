import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "modules";
import { getPlaceListsByUser } from "modules/placeList";

import PlaceList from "component/Place/PlaceList";
import Heading from "component/Place/Heading";
import PlaceListWrapper from "component/Place/PlaceListWrapper";

type Props = {
  userId?: string;
};

function PlaceListContainer({ userId }: Props) {
  const { placeLists } = useSelector((state: RootState) => state.placeList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPlaceListsByUser(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Heading>
        <span>{userId}</span>의 공개 맛집 리스트
      </Heading>
      <PlaceListWrapper>
        {placeLists?.map((placeList) => (
          <PlaceList {...placeList} key={placeList._id} showOwner={false} />
        ))}
      </PlaceListWrapper>
    </>
  );
}

export default PlaceListContainer;
