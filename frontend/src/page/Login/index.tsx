import React, { useState, useCallback } from "react";
import * as S from "./style";

function LoginPage() {
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
    [toggleInputMode]
  );

  return (
    <S.RootContainer>
      <S.TitleText>Welcome 맛플레이스!</S.TitleText>
      <S.SubTitleText>
        아래에
        <S.Bold>아이디</S.Bold>와<S.Bold>비밀번호</S.Bold>를 입력해주세요!
      </S.SubTitleText>
      <S.InputBox>
        <S.ModeText>{isLoginMode ? "Log In" : "Sign Up"}</S.ModeText>
        {!isLoginMode && (
          <>
            <S.FieldText>USER NAME</S.FieldText>
            <S.StyledInput
              type="text"
              placeholder="YOUR NAME"
              full={true}
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                console.log(inputName);
              }}
            />
          </>
        )}
        <S.FieldText>ID</S.FieldText>
        <S.StyledInput
          type="text"
          placeholder="YOUR ID"
          full={true}
          value={inputId}
          onChange={(e) => {
            setInputId(e.target.value);
            console.log(inputId);
          }}
        />
        <S.FieldText>PASSWORD</S.FieldText>
        <S.StyledInput
          type="password"
          placeholder="YOUR PASSWORD"
          full={true}
          value={inputPwd}
          onChange={(e) => {
            setInputPwd(e.target.value);
            console.log(inputPwd);
          }}
        />
        <S.StyledButton full={true}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </S.StyledButton>
        <S.TransitionButton onClick={transitionBtnClicked} />
      </S.InputBox>
    </S.RootContainer>
  );
}

export default LoginPage;
