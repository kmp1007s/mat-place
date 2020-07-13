import React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import PlaceListDetail from "page/PlaceListDetail";
import NotFoundPage from "page/NotFound";

function Places({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={`${match.path}/:id`} component={PlaceListDetail} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Places;
