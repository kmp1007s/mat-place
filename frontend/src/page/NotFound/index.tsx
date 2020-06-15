import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Link from "component/Common/Link";
import * as C from "component/NotFound";

function NotFoundPage({ location }: RouteComponentProps) {
  return (
    <C.RootContainer>
      <C.StyledImage src="/not-found.svg" alt="not_found_img" />
      <div>
        <C.NoticeText>해당 페이지를 찾을 수 없습니다!</C.NoticeText>
        <Link to="/" size="1.5">
          홈페이지로 되돌아가기
        </Link>
      </div>
    </C.RootContainer>
  );
}

export default NotFoundPage;
