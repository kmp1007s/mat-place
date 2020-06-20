import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "modules";
import { getUser } from "modules/user";

import UserDetail from "component/User/UserDetail";

type Props = {
  userId: string;
};

function UserContainer(props: Props) {
  const { userId } = props;

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <>
      <span>{userId}</span>
      <br />
      <UserDetail user={user}></UserDetail>
    </>
  );
}

export default UserContainer;
