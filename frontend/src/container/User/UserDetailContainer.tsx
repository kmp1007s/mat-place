import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "modules";
import { getUser } from "modules/user";

import Profile from "component/User/UserDetail/Profile";
import RootContainer from "component/User/UserDetail/RootContainer";

import Loading from "component/Common/Loading";

import PlaceListContainer from "container/PlaceList";

type Props = {
  userId: string;
};

function UserDetailContainer({ userId }: Props) {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { login } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <RootContainer>
      {loading === "STARTED" && <Loading background withText />}
      {loading === "SUCCESS" && user && (
        <>
          <Profile user={user} isOwner={login.userId === user.userId}></Profile>
          <PlaceListContainer userId={userId} />
        </>
      )}
      {loading === "FAIL" && (
        <>
          <div>없는 유저입니다</div>
        </>
      )}
    </RootContainer>
  );
}

export default UserDetailContainer;
