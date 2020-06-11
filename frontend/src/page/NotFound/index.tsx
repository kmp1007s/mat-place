import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Link from "component/common/Link";
import * as S from "./style";

function NotFoundPage({ location }: RouteComponentProps) {
  return (
    <S.RootContainer>
      <S.StyledImage src="/not-found.svg" alt="not_found_img" />
      <div>
        <S.NoticeText>해당 페이지를 찾을 수 없습니다!</S.NoticeText>
        <Link to="/" size="1.5">
          홈페이지로 되돌아가기
        </Link>
      </div>
    </S.RootContainer>
  );
}

export default NotFoundPage;
