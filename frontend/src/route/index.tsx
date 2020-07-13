import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IndexPage from "page/Index";
import NotFoundPage from "page/NotFound";
import LoginPage from "page/Login";

import UserRoutes from "route/Users";
import PlaceListRoutes from "route/PlaceLists";

import Header from "component/Common/Header";
import PageTemplate from "component/Common/PageTemplate";

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <PageTemplate>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/users" component={UserRoutes} />
          <Route path="/place-lists" component={PlaceListRoutes} />
          <Route component={NotFoundPage} />
        </Switch>
      </PageTemplate>
    </BrowserRouter>
  );
}

export default Routes;
