import React, { useState } from "react";
import * as S from "./style";

function LoginPage() {
  const [isLoginMode, setLoginMode] = useState(true);

  return (
    <S.RootContainer>
      <S.TitleText>Welcome 맛플레이스!</S.TitleText>
      <S.SubTitleText>
        아래에
        <S.Bold>아이디</S.Bold>와<S.Bold>비밀번호</S.Bold>를 입력해주세요!
      </S.SubTitleText>
      <S.InputBox>
        {isLoginMode && (
          <>
            <S.ModeText>Log In</S.ModeText>
            <S.FieldText>ID</S.FieldText>
            <S.StyledInput type="text" placeholder="YOUR ID" full={true} />
            <S.FieldText>PASSWORD</S.FieldText>
            <S.StyledInput
              type="password"
              placeholder="YOUR PASSWORD"
              full={true}
            />
            <S.StyledButton full={true}>LOGIN</S.StyledButton>
            <S.TransitionButton
              onClick={(e) => {
                setLoginMode(false);
              }}
            />
          </>
        )}
        {!isLoginMode && (
          <>
            <S.ModeText>Sign Up</S.ModeText>
            <S.FieldText>USER NAME</S.FieldText>
            <S.StyledInput type="text" placeholder="YOUR NAME" full={true} />
            <S.FieldText>ID</S.FieldText>
            <S.StyledInput type="text" placeholder="YOUR ID" full={true} />
            <S.FieldText>PASSWORD</S.FieldText>
            <S.StyledInput
              type="password"
              placeholder="YOUR PASSWORD"
              full={true}
            />
            <S.StyledButton full={true}>SIGN UP</S.StyledButton>
            <S.TransitionButton
              onClick={(e) => {
                setLoginMode(true);
              }}
            />
          </>
        )}
      </S.InputBox>
    </S.RootContainer>
  );
}

export default LoginPage;
