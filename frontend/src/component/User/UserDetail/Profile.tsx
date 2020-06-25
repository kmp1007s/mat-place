import React from "react";
import { UserResponse } from "api/user";

import ProfileBox from "component/User/UserDetail/ProfileBox";
import Flex from "component/Common/Flex";
import ProfileImage from "component/Common/ProfileImage";
import UserId from "component/User/UserDetail/UserId";
import BlockText from "component/User/UserDetail/BlockText";
import FieldText from "component/User/UserDetail/FieldText";
import Button from "component/Common/Button";
import DetailProfileWrapper from "component/User/UserDetail/DetailProfileWrapper";

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
        <ProfileImage path={user?.profile.image} />
        <UserId>{user.userId}</UserId>
        {isOwner && <Button invert>수정</Button>}
      </Flex>
      <DetailProfileWrapper>
        <p>
          <FieldText>사용자 이름</FieldText>
          <BlockText>{user.profile.userName}</BlockText>
        </p>
        <p>
          <FieldText>계정 생성일</FieldText>
          <BlockText>{dateUtil.format(user.createdAt)}</BlockText>
        </p>
      </DetailProfileWrapper>
    </ProfileBox>
  );
}

export default Profile;
