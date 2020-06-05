import React from "react";
import styled from "@emotion/styled";
import * as theme from "schema/colors";

const DomainContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 1rem;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 4rem;
  margin-bottom: 2%;

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 10%;
    background-color: ${theme.PRIMARY};
    bottom: 0;
    left: 0;
  }
`;

const DomainText = styled.span`
  display: block;
  background: linear-gradient(190deg, ${theme.PRIMARY} 50%, white 50%);
  position: relative;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  mix-blend-mode: lighten;
`;

// const DomainDescription = styled.div`
//   display: inline-block;
//   margin-left: 10px;
//   font-size: 1.4rem;
//   vertical-align: bottom;
//   font-weight: bold;
// `;

function Domain() {
  return (
    <DomainContainer>
      <DomainText>맛플레이스</DomainText>
      {/* <DomainDescription>맛집 공유 플랫폼</DomainDescription> */}
    </DomainContainer>
  );
}

export default Domain;
