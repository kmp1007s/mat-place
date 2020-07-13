import React from "react";
import styled from "@emotion/styled";

const StyledImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  float: left;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  user-select: none;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

const HideInput = styled.input`
  display: none;
`;

type Props = {
  path: string;
  onPhotoChange: Function;
  isOwner: boolean;
};

function Profile(props: Props) {
  const { path } = props;

  return (
    <>
      <label htmlFor="profileUpload">
        <StyledImage
          src={`${process.env.REACT_APP_SERVER}/${path}`}
          alt="Profile"
        />
      </label>

      {props.isOwner && (
        <HideInput
          type="file"
          id="profileUpload"
          accept="image/*"
          onChange={(e) => {
            let image: File | null = null;

            if (e.target.files) {
              image = e.target.files[0];
            }

            if (image) {
              console.log(image.type);
              props.onPhotoChange(image);
            }
          }}
        />
      )}
    </>
  );
}

export default Profile;
