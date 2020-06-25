import React, { useEffect } from "react";
import Route from "./route";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { tokenCheck } from "modules/login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Cookies.get("token"));
    dispatch(tokenCheck());
  }, [dispatch]);

  return <Route />;
}

export default App;
