import styled from "@emotion/styled";

import * as color from "schema/colors";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const NoticeText = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  margin-right: 0.9rem;
  font-weight: 700;
`;

export const StyledImage = styled.img`
  display: inline-block;
  height: 450px;
  border-radius: 22%;
`;

export const NotFoundMessage = styled.h1`
  margin: 32px;
  color: ${color.BLACK_LIGHT};
`;
