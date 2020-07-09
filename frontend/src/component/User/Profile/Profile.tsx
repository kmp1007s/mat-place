import React from "react";
import { UserResponse } from "api/user";

import Flex from "component/Common/Flex";
import ProfileImage from "component/Common/ProfileImage";
import Button from "component/Common/Button";

import ProfileBox from "component/User/Profile/ProfileBox";
import UserId from "component/User/Profile/UserId";
import Text from "component/User/Profile/Text";
import BoldText from "component/User/Profile/BoldText";
import BottomWrapper from "component/User/Profile/BottomWrapper";

import * as dateUtil from "lib/dateUtil";

type Props = {
  user: UserResponse;
  isOwner: boolean;
};

function Profile(props: Props) {
  const { user, isOwner } = props;

  return (
    <ProfileBox>
      <Flex padding={80}>
        <ProfileImage path={user.profile.image} />
        <UserId>{user.userId}</UserId>
        {isOwner && <Button invert>수정</Button>}
      </Flex>
      <BottomWrapper>
        <p>
          <BoldText>사용자 이름</BoldText>
          <Text>{user.profile.userName}</Text>
        </p>
        <p>
          <BoldText>계정 생성일</BoldText>
          <Text>{dateUtil.format(user.createdAt)}</Text>
        </p>
      </BottomWrapper>
    </ProfileBox>
  );
}

export default Profile;
