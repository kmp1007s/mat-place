import React from "react";
import SnsButton from "./SnsButton";

function FaceBook(props: typeof SnsButton.defaultProps) {
  return <SnsButton {...props} src="/facebook-icon.svg" />;
}

export default FaceBook;
