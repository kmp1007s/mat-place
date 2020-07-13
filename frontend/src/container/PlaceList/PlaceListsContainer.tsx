import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "modules";
import {
  getPlaceListsByUser,
  deletePlaceList,
  addPlaceList,
} from "modules/placeList";

import PlaceList from "component/Place/PlaceList";
import PlaceListsWrapper from "component/Place/PlaceListsWrapper";
import { PlaceListBox } from "component/Place/PlaceList";

import AddInputBoxContainer from "container/PlaceList/AddInputBoxContainer";

import { AiOutlinePlus } from "react-icons/ai";

import styled from "lib/styled";

import TopAlert from "component/Common/TopAlert";
import Button from "component/Common/Button";

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

  const [showAddInputBox, setShowAddInputBox] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState<{
    targetId: string;
    toShow: boolean;
  }>({ targetId: "", toShow: false });

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
                onEditClick={(placeListId: string) => {}}
                onDeleteClick={(placeListId: string) => {
                  setShowDeleteBox({ targetId: placeListId, toShow: true });
                }}
              />
            ))}
            {showAddInputBox && (
              <AddInputBoxContainer
                onPositiveButtonClick={(
                  inputTitle: string,
                  places: Array<any>,
                  isPublic: boolean
                ) => {
                  dispatch(
                    addPlaceList([
                      {
                        title: inputTitle,
                        places,
                        public: isPublic,
                      },
                      {
                        afterTodo: () => {
                          setShowAddInputBox(false);
                        },
                      },
                    ])
                  );
                }}
                onNegativeButtonClick={() => {
                  setShowAddInputBox(false);
                }}
              />
            )}
            {
              // 수정 권한이 있는 경우
              isOwner && (
                <AddBox
                  onClick={(e) => {
                    setShowAddInputBox(true);
                  }}
                >
                  <Add size={22} />
                </AddBox>
              )
            }
          </PlaceListsWrapper>
          {showDeleteBox.toShow && (
            <TopAlert
              onClose={() => {
                setShowDeleteBox({ targetId: "", toShow: false });
              }}
            >
              <div>삭제하시겠습니까?</div>
              <div>
                <Button
                  onClick={(e) => {
                    if (showDeleteBox.targetId) {
                      dispatch(deletePlaceList(showDeleteBox.targetId));
                      setShowDeleteBox({ targetId: "", toShow: false });
                    }
                  }}
                >
                  예
                </Button>
                <Button
                  onClick={(e) => {
                    setShowDeleteBox({ targetId: "", toShow: false });
                  }}
                >
                  아니오
                </Button>
              </div>
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
