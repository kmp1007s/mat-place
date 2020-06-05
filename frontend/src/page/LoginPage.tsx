import React from "react";
import styled from "@emotion/styled";
import * as theme from "schema/colors";

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BannerText = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  font-weight: 900;
`;

const InputContainer = styled.div`
  background-color: lightgray;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TransformTrigger = styled.button``;

const RegisterContainer = styled.div``;

function LoginPage() {
  return (
    <RootContainer>
      <BannerText>Welcome</BannerText>
      <InputContainer>
        <LoginContainer>
          <div>
            ID: <input type="text" />
          </div>
          <div>
            Password: <input type="password" />
          </div>
          <TransformTrigger>회원가입 전환</TransformTrigger>
        </LoginContainer>
        <RegisterContainer></RegisterContainer>
      </InputContainer>
    </RootContainer>
  );
}

export default LoginPage;
