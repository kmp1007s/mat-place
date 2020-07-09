import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "modules";
import { getUser, updateUser } from "modules/user";

import Profile from "component/Profile/Profile";

type Props = {
  userId: string;
};

function ProfileContainer(props: Props) {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { login } = useSelector((state: RootState) => state);

  const [isEdit, setIsEdit] = useState(false);
  const [valueUserName, setValueUserName] = useState("");

  useEffect(() => {
    dispatch(getUser(props.userId));
  }, [props.userId, dispatch]);

  return (
    <>
      {loading === "SUCCESS" && user && (
        <Profile
          user={user}
          isOwner={login.userId === props.userId}
          isEdit={isEdit}
          onEditClick={() => {
            setIsEdit(!isEdit);
          }}
          onEditComplete={() => {
            dispatch(
              updateUser({
                userId: props.userId,
                userName: valueUserName,
                afterSuccess: () => {
                  setIsEdit(false);
                },
              })
            );
          }}
          onUserNameChange={(input: string) => {
            setValueUserName(input);
          }}
        />
      )}
      {loading === "FAIL" && (
        <>
          <div>없는 유저입니다</div>
        </>
      )}
    </>
  );
}

export default ProfileContainer;
