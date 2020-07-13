import React from "react";
import styled from "lib/styled";

import { Place as TypePlace } from "api/place";

import { AiFillPicture } from "react-icons/ai";

const Image = styled.div<{ url: string | null }>`
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  background-color: ${(props) => props.theme.color.GRAY};
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  ${(props) => props.url && `background-image: url(${props.url});`}
  text-align: center;
  vertical-align: middle;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 3px;
  margin-right: 18px;
  float: left;
  transition: all 0.35s ease;

  & span {
    color: ${(props) => props.theme.color.WHITE_LIGHT};
  }

  &:hover {
    background-size: 110%;
    filter: brightness(107%);
  }
`;

const Wrapper = styled.div`
  & a {
    text-decoration: none;

    & .linkText {
      color: ${(props) => props.theme.color.GRAY_DARK};
      font-size: 1.15rem;
      font-weight: 200;
      margin-bottom: 32px;
      transition: all 0.3s ease;

      &:hover {
        color: ${(props) => props.theme.color.GRAY};
      }
    }
  }

  & > div {
    color: ${(props) => props.theme.color.GRAY};
  }
`;

type Props = TypePlace & {
  imgUrl: string | null;
};

function Place(props: Props) {
  return (
    <Wrapper>
      <a
        href={`http://place.map.kakao.com/${props.id}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image url={props.imgUrl}>
          {!props.imgUrl && (
            <span>
              <AiFillPicture />
              No Image
            </span>
          )}
        </Image>
        <div className="linkText">{props.name}</div>
      </a>
      <div>{props.address}</div>
      <div>{props.phone || "전화번호가 없습니다"}</div>
    </Wrapper>
  );
}

export default Place;
