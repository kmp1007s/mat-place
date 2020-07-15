import React from "react";

import { keyframes } from "@emotion/core";
import styled from "lib/styled";

import { PlaceList } from "api/place";
import { AiFillPicture, AiOutlineUser, AiFillLike } from "react-icons/ai";

import FaceBook from "component/Common/FaceBook";
import Kakao from "component/Common/Kakao";

import { Link } from "react-router-dom";

const slideTop = keyframes`
  0%{opacity: 0; transform: translateY(-7%);}
  100%{opacity: 1; transform: translateY(0%);}
`;

const Wrapper = styled.div`
  padding: 12px 24px;
  margin: 0px 64px;
  height: 104px;
  clear: both;
  background-color: ${(props) => props.theme.color.WHITE};
  animation: ${slideTop} ease 1s;
  // border-radius: 4px;
  // border-bottom: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  //   0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: 0;
  }
`;

const Image = styled.div<{ path?: string }>`
  display: inline-block;
  float: left;
  width: 80px;
  height: 80px;
  ${(props) => props.path && `background-image: url("${props.path}");`}
  background-color: ${(props) => props.theme.color.GRAY_LIGHT};
  background-size: cover;
  margin-right: 26px;
  border-radius: 5px;
`;

const Title = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) => props.theme.color.GRAY_DARK};
  margin-bottom: 7px;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  }
`;
const UserId = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.GRAY_DARK};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  }
`;

const IconWrapper = styled.div`
  float: right;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 4px;
  padding: 4px;
`;

const StyledUserIcon = styled(AiOutlineUser)`
  vertical-align: middle;
  margin-right: 7px;
  color: ${(props) => props.theme.color.PRIMARY_LIGHT};
`;

const ImageIcon = styled(AiFillPicture)`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color ${(props) => props.theme.color.WHITE};
`;

const LikeIcon = styled(AiFillLike)`
  width: 20px;
  height: 20px;
  float: left;
  vertical-align: middle;
  color: ${(props) => props.theme.color.BLUE};
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
`;

type Props = PlaceList & {
  path: string;
};

function PreviewList(props: Props) {
  return (
    <Wrapper>
      <Image path={props.path}>{!props.path && <ImageIcon size={46} />}</Image>
      <Title to={`/users/${props.userId}#${props._id}`}>{props.title}</Title>
      <UserId to={`/users/${props.userId}`}>
        <StyledUserIcon />
        {props.userId}
      </UserId>
      <IconWrapper>
        <FaceBook
          onClick={(e) => {
            window.FB.ui(
              {
                display: "popup",
                method: "share",
                href: `http://localhost:3000/users/${props.userId}#${props._id}`,
              },
              function (response: any) {}
            );
          }}
        />
        <Kakao
          onClick={(e) => {
            window.Kakao.Link.sendDefault({
              objectType: "feed",
              content: {
                title: props.title,
                description: `${props.userId}님의 ${props.title} 맛집 리스트입니다`,
                imageUrl: `${props.path}`,
                link: {
                  mobileWebUrl: `http://localhost:3000`,
                  webUrl: `http://localhost:3000`,
                },
              },
              buttons: [
                {
                  title: "바로가기",
                  link: {
                    mobileWebUrl: `http://localhost:3000/users/${props.userId}#${props._id}`,
                    webUrl: `http://localhost:3000/users/${props.userId}#${props._id}`,
                  },
                },
              ],
            });
          }}
        />
        <LikeIcon />
      </IconWrapper>
    </Wrapper>
  );
}

export default PreviewList;
