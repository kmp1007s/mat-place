import React, { useState, useCallback } from "react";
import * as C from "component/Login";
import * as api from "api/auth";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "modules";
import { startLogin } from "modules/login";

function LoginContainer() {
  const userId = useSelector((state: RootState) => state.login.userId);
  const dispatch = useDispatch();

  const [isLoginMode, setLoginMode] = useState(true);

  const [inputId, setInputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputName, setInputName] = useState("");

  const resetInputs = useCallback(() => {
    setInputId("");
    setInputPwd("");
    setInputName("");
  }, []);

  const toggleInputMode = useCallback(() => {
    setLoginMode(!isLoginMode);
  }, [isLoginMode]);

  const transitionBtnClicked = useCallback(
    (e) => {
      toggleInputMode();
      resetInputs();
    },
    [toggleInputMode, resetInputs]
  );

  const submitClicked = useCallback(
    async (e) => {
      const userId = inputId;
      const password = inputPwd;
      const userName = inputName;

      if (isLoginMode) {
        dispatch(startLogin({ userId, password }));
      } else {
        const { data } = await api.register({ userId, password, userName });
        console.log(data);
      }

      resetInputs();
    },
    [inputId, inputPwd, inputName, isLoginMode, resetInputs]
  );

  return (
    <C.InputBox>
      <C.ModeText>{isLoginMode ? "Log In" : "Sign Up"}</C.ModeText>
      {!isLoginMode && (
        <>
          <C.FieldText>USER NAME</C.FieldText>
          <C.StyledInput
            type="text"
            placeholder="YOUR NAME"
            full={true}
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
        </>
      )}
      <C.FieldText>ID</C.FieldText>
      <C.StyledInput
        type="text"
        placeholder="YOUR ID"
        full={true}
        value={inputId}
        onChange={(e) => {
          setInputId(e.target.value);
        }}
      />
      <C.FieldText>PASSWORD</C.FieldText>
      <C.StyledInput
        type="password"
        placeholder="YOUR PASSWORD"
        full={true}
        value={inputPwd}
        onChange={(e) => {
          setInputPwd(e.target.value);
        }}
      />
      <C.StyledButton full={true} onClick={submitClicked}>
        {isLoginMode ? "LOGIN" : "SIGN UP"}
      </C.StyledButton>
      <C.TransitionButton onClick={transitionBtnClicked} />
    </C.InputBox>
  );
}

export default LoginContainer;
