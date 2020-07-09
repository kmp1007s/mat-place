import React from "react";
import styled from "@emotion/styled";

type Props = {
  path: string;
};

const StyledImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  float: left;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  user-select: none;
`;

function Profile(props: Props) {
  const { path } = props;

  return (
    <StyledImage
      src={`${process.env.REACT_APP_SERVER}/${path}`}
      alt="Profile"
    />
  );
}

export default Profile;
