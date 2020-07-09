import React from "react";

import styled from "lib/styled";
import * as dateUtil from "lib/dateUtil";

import { PlaceList as TypePlaceList } from "api/place";

import Flex from "component/Common/Flex";
import FaceBook from "component/Common/FaceBook";
import Kakao from "component/Common/Kakao";
import Date from "component/Place/Date";
import BottomWrapper from "component/Place/BottomWrapper";

import PlaceContainer from "container/PlaceContainer";

import { AiOutlineClose, AiFillEdit } from "react-icons/ai";

export const PlaceListBox = styled(Flex)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  margin-bottom: 1px;
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

type Props = TypePlaceList & {
  showOwner?: boolean;
  isOwner: boolean;
};

function PlaceList(props: Props) {
  return (
    <PlaceListBox>
      <Title>{props.title}</Title>
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
                <Edit />
                <Delete />
              </>
            )
          }
        </IconWrapper>
      </BottomWrapper>
    </PlaceListBox>
  );
}

export default PlaceList;
