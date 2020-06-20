import React, { useState, useCallback, useEffect } from "react";
import * as C from "component/Login";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "modules";
import { login, register } from "modules/login";
import { RouteComponentProps } from "react-router-dom";

function LoginContainer({ history }: RouteComponentProps) {
  const { loading } = useSelector((state: RootState) => state.login);
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

      if (isLoginMode) dispatch(login({ userId, password }));
      else dispatch(register({ userId, password, userName }));

      resetInputs();
    },
    [inputId, inputPwd, inputName, isLoginMode, resetInputs, dispatch]
  );

  useEffect(() => {
    // 로그인 성공
    if (loading === "SUCCESS") history.push("/"); // Index 페이지로 리다이렉트
  }, [loading, history]);

  return (
    <>
      {loading === "STARTED" && (
        <C.Loading>
          <span>요청을 처리 중입니다...</span>
        </C.Loading>
      )}
      <C.InputBox>
        <C.ModeText>{isLoginMode ? "로그인" : "회원가입"}</C.ModeText>
        <C.FieldText>아이디</C.FieldText>
        <C.StyledInput
          type="text"
          placeholder="YOUR ID"
          full={true}
          value={inputId}
          onChange={(e) => {
            setInputId(e.target.value);
          }}
        />
        <C.FieldText>비밀번호</C.FieldText>
        <C.StyledInput
          type="password"
          placeholder="YOUR PASSWORD"
          full={true}
          value={inputPwd}
          onChange={(e) => {
            setInputPwd(e.target.value);
          }}
        />
        {!isLoginMode && (
          <>
            <C.FieldText>사용할 이름</C.FieldText>
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
        <C.StyledButton full={true} onClick={submitClicked}>
          {isLoginMode ? "LOG IN" : "SIGN UP"}
        </C.StyledButton>
        <C.TransitionButton
          className={isLoginMode ? "" : "register"}
          onClick={transitionBtnClicked}
        />
      </C.InputBox>
    </>
  );
}

export default LoginContainer;
