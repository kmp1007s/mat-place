import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "modules";
import { getPlaceListsByUser } from "modules/placeList";

import PlaceList from "component/Place/PlaceList";
import PlaceListsWrapper from "component/Place/PlaceListsWrapper";
import { PlaceListBox } from "component/Place/PlaceList";
import TopAlert from "component/Common/TopAlert";

import PlaceSearchContainer from "container/PlaceSearchContainer";

import { AiOutlinePlus } from "react-icons/ai";

import styled from "lib/styled";

const AddBox = styled(PlaceListBox)`
  background-color: ${(props) => props.theme.color.PRIMARY};

  margin-bottom: 0;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(82%);
  }
`;

const Add = styled(AiOutlinePlus)`
  color: ${(props) => props.theme.color.WHITE_LIGHT};
`;

type Props = {
  userId: string;
};

function PlaceListContainer(props: Props) {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const { placeLists, loading } = useSelector(
    (state: RootState) => state.placeList
  );
  const { login } = useSelector((state: RootState) => state);
  const isOwner = login.userId === props.userId;

  useEffect(() => {
    dispatch(getPlaceListsByUser(props.userId));
  }, [dispatch, props.userId]);

  return (
    <>
      {loading === "SUCCESS" && placeLists && (
        <>
          <PlaceListsWrapper>
            {placeLists?.map((placeList) => (
              <PlaceList
                {...placeList}
                key={placeList._id}
                showOwner={false}
                isOwner={isOwner}
              />
            ))}
            {
              // 수정 권한이 있는 경우
              isOwner && (
                <AddBox
                  onClick={(e) => {
                    setShowSearch(true);
                  }}
                >
                  <Add size={22} />
                </AddBox>
              )
            }
          </PlaceListsWrapper>
          {showSearch && (
            <TopAlert
              onClose={() => {
                setShowSearch(false);
              }}
            >
              <PlaceSearchContainer />
            </TopAlert>
          )}
        </>
      )}
      {
        // 로딩은 성공했으나 생성한 맛집리스트가 없는 경우
        loading === "SUCCESS" && placeLists === null && (
          <>
            <h1>공개된 맛집 리스트가 없습니다</h1>
          </>
        )
      }
    </>
  );
}

export default PlaceListContainer;
