import React, { useEffect } from "react";
import Route from "./route";
import { useDispatch } from "react-redux";
import { tokenCheck } from "modules/login";

declare global {
  interface Window {
    Kakao: any;
    FB: any;
  }
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    dispatch(tokenCheck());
  }, [dispatch]);

  return <Route />;
}

export default App;
