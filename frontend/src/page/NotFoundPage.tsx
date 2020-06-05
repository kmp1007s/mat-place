import React from "react";
import styled from "@emotion/styled";
import { RouteComponentProps } from "react-router-dom";
import StyledLink from "component/common/StyledLink";
import * as theme from "schema/colors";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const UrlText = styled.h1`
  font-size: 2.6rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const NoticeText = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  margin-right: 0.9rem;
`;

const StyledImage = styled.img`
  display: inline-block;
  background-color: ${theme.GRAY_LIGHT};
  height: 450px;
  border-radius: 35%;
`;

const TestContainer = styled.div`
  height: 100%;
  background-color: orange;
`;

function NotFoundPage({ location }: RouteComponentProps) {
  return (
    <RootContainer>
      <StyledImage src="/not-found.svg" alt="not_found_img" />
      <UrlText>URL: {location.pathname}</UrlText>
      <div>
        <NoticeText>해당 페이지를 찾을 수 없습니다!</NoticeText>
        <StyledLink to="/" size="1.5">
          홈페이지로 되돌아가기
        </StyledLink>
      </div>
    </RootContainer>
    // <TestContainer />
  );
}

export default NotFoundPage;
