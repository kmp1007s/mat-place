import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IndexPage from "page/Index";
import NotFoundPage from "page/NotFound";
import LoginPage from "page/Login";
import UserRoutes from "route/Users";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/users" component={UserRoutes} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
