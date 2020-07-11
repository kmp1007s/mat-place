import React, { useState } from "react";

import styled from "lib/styled";
import * as dateUtil from "lib/dateUtil";

import { PlaceList as TypePlaceList } from "api/place";

import Flex from "component/Common/Flex";
import FaceBook from "component/Common/FaceBook";
import Kakao from "component/Common/Kakao";
import Date from "component/Place/Date";
import BottomWrapper from "component/Place/BottomWrapper";

import PlaceContainer from "container/PlaceContainer";
import AddInputBoxContainer from "container/PlaceList/AddInputBoxContainer";

import { AiOutlineClose, AiFillEdit, AiOutlineCheck } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { updatePlaceList } from "modules/placeList";

export const PlaceListBox = styled(Flex)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  padding: 18px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};

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

const Delete = styled(AiOutlineClose)`
  float: left;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: ${(props) => props.theme.color.RED};
  user-select: none;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  &:active {
    filter: brightness(75%);
  }
`;

const Edit = styled(AiFillEdit)`
  float: left;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: ${(props) => props.theme.color.GREEN};
  user-select: none;
  object-fit: cover;
  margin-right: 4px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  &:active {
    filter: brightness(75%);
  }
`;

const IconWrapper = styled.div`
  float: right;
  background-color: ${(props) => props.theme.color.WHITE};
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 4px;
  padding: 4px;
`;

const PublicContainer = styled.div`
  margin-left: 8px;
  display: inline-block;
  color: ${(props) => props.theme.color.GREEN};
  font-size: 0.9rem;
  user-select: none;
`;

type Props = TypePlaceList & {
  showOwner?: boolean;
  isOwner: boolean;
  onEditClick: Function;
  onDeleteClick: Function;
};

function PlaceList(props: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  return (
    <PlaceListBox>
      {isEdit && (
        <AddInputBoxContainer
          existPlaces={props.places}
          existTitle={props.title}
          onPositiveButtonClick={(inputTitle: string, places: Array<any>) => {
            if (props._id) {
              dispatch(
                updatePlaceList([
                  [
                    props._id,
                    {
                      title: inputTitle,
                      places: places,
                    },
                  ],
                  {
                    afterTodo: () => {
                      setIsEdit(false);
                    },
                  },
                ])
              );
            }
          }}
          onNegativeButtonClick={() => {
            setIsEdit(false);
          }}
        />
      )}
      {!isEdit && (
        <>
          <Title>
            {props.title}
            {props.public && (
              <PublicContainer>
                <AiOutlineCheck />
                <span>공개된 리스트입니다</span>
              </PublicContainer>
            )}
          </Title>
          {props.places.map((place, idx) => (
            <PlaceContainer key={idx} {...place} />
          ))}
          {props.showOwner && <div>{props.userId}</div>}
          <BottomWrapper>
            <Date>{dateUtil.format(props.createdAt)}</Date>
            <IconWrapper>
              <FaceBook />
              <Kakao />
              {
                // 수정 권한이 있는 경우
                props.isOwner && (
                  <>
                    <Edit
                      onClick={() => {
                        setIsEdit(true);
                        props.onEditClick();
                      }}
                    />
                    <Delete
                      onClick={() => {
                        console.log(props._id);
                        props.onDeleteClick(props._id);
                      }}
                    />
                  </>
                )
              }
            </IconWrapper>
          </BottomWrapper>
        </>
      )}
    </PlaceListBox>
  );
}

export default PlaceList;
