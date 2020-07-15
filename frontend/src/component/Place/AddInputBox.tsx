import React from "react";

import { keyframes } from "@emotion/core";
import styled from "lib/styled";

import Input from "component/Common/Input";
import Button from "component/Common/Button";
import PlaceItem from "component/Place/AddInputBoxPlaceItem";

import PlaceSearchContainer from "container/PlaceSearchContainer";
import GroupContainer from "container/GroupContainer";

import { Group, updateGroup } from "api/place";

const fadeIn = keyframes`
  0% {opacity: 0.5;}
  100% {opacity: 1;}
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.color.WHITE};
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 3px;
  padding: 16px 36px 16px 36px;
  animation: ${fadeIn} 0.7s ease;

  & > div {
    margin: 16px 0;
  }
`;

const TitleArea = styled.div`
  & .fieldText {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => props.theme.color.BLACK_LIGHT};
  }

  & > input {
    margin: 16px 0;
    padding-left: 0;
  }
`;

const ButtonArea = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.PRIMARY_LIGHT};
  text-align: center;
  margin-bottom: 0;
`;

const CheckboxArea = styled.div`
  & .noticeText {
    font-size: 1.1rem;
    color: ${(props) => props.theme.color.GRAY};
    margin-right: 4px;
  }

  & > input {
    vertical-align: middle;
  }
`;

const SelectedPlaceWrapper = styled.ul`
  padding: 0;
  margin: 0;
  background-color: white;
  max-height: 100px;
  overflow-y: auto;
`;

type Props = {
  selectedPlaces: Array<any>;
  inputTitle: string;
  setInputTitle: any;
  isPublic: boolean;
  setIsPublic: any;
  setSelectedGroup: Function;
  onListItemClick: Function;
  onPositiveButtonClick: Function;
  onNegativeButtonClick: Function;
  userId: string;
};

function AddInputBox(props: Props) {
  return (
    <Wrapper>
      <TitleArea>
        <span className="fieldText">맛집 리스트 제목을 입력해주세요</span>
        <Input
          full
          placeholder="나의 돈까스 맛집"
          value={props.inputTitle}
          onChange={(e) => {
            props.setInputTitle(e.target.value);
          }}
        />
      </TitleArea>
      <SelectedPlaceWrapper>
        {props.selectedPlaces.map((item, idx) => (
          <PlaceItem key={idx} place={item} />
        ))}
      </SelectedPlaceWrapper>
      <div>
        <PlaceSearchContainer onListItemClick={props.onListItemClick} />
      </div>
      <div>
        <GroupContainer
          userId={props.userId}
          onListItemClick={(group: Group) => {
            console.log(group.placeListIds);
            props.setSelectedGroup(group.name);
          }}
          showAdd={false}
        />
      </div>
      <CheckboxArea>
        <span className="noticeText">이 리스트를 공개합니다</span>
        <input
          type="checkbox"
          checked={props.isPublic}
          onChange={(e) => {
            props.setIsPublic(!props.isPublic);
          }}
        />
      </CheckboxArea>
      <ButtonArea>
        <Button onClick={(e) => props.onPositiveButtonClick()}>확인</Button>
        <Button onClick={(e) => props.onNegativeButtonClick()}>취소</Button>
      </ButtonArea>
    </Wrapper>
  );
}

export default AddInputBox;
