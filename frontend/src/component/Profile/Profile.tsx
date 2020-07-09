import React from "react";
import { UserResponse } from "api/user";

import Flex from "component/Common/Flex";
import ProfileImage from "component/Common/ProfileImage";
import Button from "component/Common/Button";
import EditIcon from "component/Profile/EditIcon";
import CheckIcon from "component/Profile/CheckIcon";

import ProfileBox from "./ProfileBox";
import UserId from "./UserId";
import Text from "./Text";
import TextWrapper from "./TextWrapper";
import Input from "./Input";

import * as dateUtil from "lib/dateUtil";

type Props = {
  user: UserResponse;
  isOwner: boolean;
  isEdit: boolean;
  onEditClick: Function;
  onEditComplete: Function;
  onUserNameChange: Function;
};

function Profile(props: Props) {
  const { user, isOwner, isEdit, onUserNameChange } = props;

  return (
    <ProfileBox>
      <Flex padding={30}>
        <ProfileImage path={user.profile.image} />
        <TextWrapper>
          <UserId>{user.userId}</UserId>
          {isEdit ? (
            <Input
              placeholder="사용자 이름을 입력해주세요"
              onChange={(e) => {
                onUserNameChange(e.target.value);
              }}
            />
          ) : (
            <Text>{user.profile.userName}</Text>
          )}
          <Text>{dateUtil.format(user.createdAt)}</Text>
          {isOwner && (
            <Button
              invert
              onClick={(e) => {
                props.onEditClick();
              }}
            >
              <EditIcon />
              수정
            </Button>
          )}
          {isEdit && (
            <Button
              invert
              onClick={(e) => {
                props.onEditComplete();
              }}
            >
              <CheckIcon />
              완료
            </Button>
          )}
        </TextWrapper>
      </Flex>
    </ProfileBox>
  );
}

export default Profile;
