import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Link from "component/Common/Link";
import * as C from "component/NotFound";

function NotFoundPage(props: RouteComponentProps) {
  return (
    <C.RootContainer {...props}>
      <C.StyledImage src="/not-found.svg" alt="not_found_img" />
      <C.NotFoundMessage>404 Not Found</C.NotFoundMessage>
      <div>
        <C.NoticeText>해당 페이지를 찾을 수 없습니다!</C.NoticeText>
        <Link to="/" size="1.5">
          메인으로 되돌아가기
        </Link>
      </div>
    </C.RootContainer>
  );
}

export default NotFoundPage;
