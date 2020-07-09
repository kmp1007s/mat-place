import React from "react";
import { RouteComponentProps } from "react-router-dom";

import ProfileContainer from "container/Profile/ProfileContainer";
import PlaceListContainer from "container/PlaceList/PlaceListsContainer";

import RootContainer from "component/Profile/RootContainer";
import Heading from "component/Place/Heading";

type MatchParams = {
  id: string;
};

function UserDetail({ match }: RouteComponentProps<MatchParams>) {
  const userId = match.params.id;
  return (
    <RootContainer>
      <ProfileContainer userId={userId} />
      <Heading>
        <p>
          <span className="userName">{userId}</span>님의 맛집 리스트
        </p>
        <p className="subTitle">사용자가 공개한 맛집리스트를 나열합니다</p>
        <p className="subTitle">
          장소의 이미지를 클릭하면 카카오 상세페이지로 넘어가요!
        </p>
      </Heading>
      <PlaceListContainer userId={userId} />
    </RootContainer>
  );
}

export default UserDetail;
