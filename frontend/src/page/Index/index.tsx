import React from "react";
import styled from "lib/styled";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/core";

const fadeIn = keyframes`
  0%{opacity: 0;}
  100%{opacity: 1;}
`;

const Wrapper = styled.div`
  height: 100%;
  background-image: url("/main-bg.png");
  background-size: cover;
  text-align: center;

  & > div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  & .title {
    margin: 0 0 8px 0;
    color: ${(props) => props.theme.color.WHITE};
    font-size: 8rem;
    font-weight: 200;
    animation: ${fadeIn} 1.5s ease;
  }

  & .subTitle {
    color: ${(props) => props.theme.color.WHITE};
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 62px;
    animation: ${fadeIn} 3.5s ease;
  }
`;

const QuickLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.WHITE};
  border: 1px solid ${(props) => props.theme.color.WHITE};
  border-radius: 1px;
  padding: 24px 12px;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: transparent;
    background-color: ${(props) => props.theme.color.WHITE};
    color: ${(props) => props.theme.color.GRAY_DARK};
  }
`;

function Index() {
  return (
    <Wrapper>
      <div>
        <h2 className="title">맛플레이스</h2>
        <div className="subTitle">
          맛플레이스는 개인을 위한 맛집 공유 플랫폼입니다
        </div>
        <div>
          <QuickLink to="/place-lists">맛집 리스트 보러가기</QuickLink>
        </div>
      </div>
    </Wrapper>
  );
}

export default Index;
