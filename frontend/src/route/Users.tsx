import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import UserDetail from "page/User/UserDetail";
import NotFoundPage from "page/NotFound";

function Users({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={`${match.path}/:id`} component={UserDetail} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Users;
