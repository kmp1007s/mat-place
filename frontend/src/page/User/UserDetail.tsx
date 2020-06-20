import React from "react";
import { RouteComponentProps } from "react-router-dom";

import UserContainer from "container/User";

type MatchParams = {
  id: string;
};

function UserDetail({ match }: RouteComponentProps<MatchParams>) {
  return (
    <>
      <UserContainer userId={match.params.id} />
    </>
  );
}

export default UserDetail;
