import React from "react";
import LoginContainer from "container/Login";
import * as C from "component/Login";
import { RouteComponentProps } from "react-router-dom";

function LoginPage(props: RouteComponentProps) {
  return (
    <C.RootContainer>
      <C.TitleText>Welcome 맛플레이스!</C.TitleText>
      <C.SubTitleText>
        아래에
        <C.Bold>아이디</C.Bold>와<C.Bold>비밀번호</C.Bold>를 입력해주세요!
      </C.SubTitleText>
      <LoginContainer {...props} />
    </C.RootContainer>
  );
}

export default LoginPage;
