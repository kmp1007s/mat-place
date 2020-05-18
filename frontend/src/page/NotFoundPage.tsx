import React from "react";
import styled from "@emotion/styled";
import { RouteComponentProps } from "react-router-dom";
import StyledLink from "component/common/StyledLink";
import * as theme from "colorTheme";

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // background-color: ${theme.PRIMARY_LIGHT};
  // background-color: #b293ff;
`;

const LocationText = styled.h1`
  font-size: 3.6rem;
  margin: 2rem;
`;

const DescriptionText = styled.p`
  font-size: 2.4rem;
  margin: 0.8rem;
`;

const ExtendedLink = styled(StyledLink)`
  font-size: 2.2rem;
`;

const StyledImage = styled.img`
  flex: 0.8;
`;

function NotFoundPage({ location }: RouteComponentProps) {
  return (
    <RootContainer>
      {/* <Domain /> */}
      <StyledImage src="/not-found.svg" alt="not-found-img" />
      <LocationText>{location.pathname}</LocationText>
      <DescriptionText>해당 페이지를 찾을 수 없습니다!</DescriptionText>
      <ExtendedLink to="/">홈페이지로 되돌아가기</ExtendedLink>
    </RootContainer>
  );
}

export default NotFoundPage;
