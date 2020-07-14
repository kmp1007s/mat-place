import React from "react";
import { RouteComponentProps } from "react-router-dom";

import PreviewListContainer from "container/PlaceList/PreviewListContainer";

import styled from "lib/styled";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  height: 100%;
`;

const Heading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.GRAY_DARK};
  font-size: 2rem;
  font-weight: 500;
  margin: 0px 16px 16px 16px;
  padding-top: 44px;
`;

const SubHeading = styled.h4`
  text-align: center;
  color: ${(props) => props.theme.color.GRAY};
  font-size: 1.6rem;
  font-weight: 400;
  margin: 16px;
  margin-bottom: 44px;
`;

type MatchParams = {
  id: string;
};

function PlaceListsPage(props: RouteComponentProps<MatchParams>) {
  return (
    <Wrapper>
      <Heading>맛집 리스트 목록</Heading>
      <SubHeading>사용자들이 공개한 맛집 리스트 목록이에요</SubHeading>
      <PreviewListContainer />
    </Wrapper>
  );
}

export default PlaceListsPage;
