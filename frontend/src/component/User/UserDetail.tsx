import React from "react";
import { User } from "modules/user";

type Props = {
  user: User;
};

function UserDetail(props: Props) {
  return (
    <>
      <img
        src={`${process.env.REACT_APP_SERVER}/${props.user?.profile.image}`}
        alt="No Image"
      />
    </>
  );
}

export default UserDetail;
