import React, { useEffect } from "react";
import Route from "./route";
import { useDispatch } from "react-redux";
import { tokenCheck } from "modules/login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tokenCheck());
  }, [dispatch]);

  return <Route />;
}

export default App;
