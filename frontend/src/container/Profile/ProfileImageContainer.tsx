import React, { useState } from "react";
import ProfileImage from "component/Common/ProfileImage";
import { updateUserImage } from "api/user";

type Props = {
  path: string;
  userId: string;
  isOwner: boolean;
};

function ProfileImageContainer(props: Props) {
  const [path, setPath] = useState(props.path);

  return (
    <ProfileImage
      {...props}
      path={path}
      onPhotoChange={async (image: File) => {
        const { data } = await updateUserImage(props.userId, image);
        setPath(data.imgName);
      }}
    />
  );
}
export default ProfileImageContainer;
