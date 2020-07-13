import React from "react";
import SnsButton from "./SnsButton";

function Kakao(props: typeof SnsButton.defaultProps) {
  return <SnsButton src="/kakao-icon.svg" {...props} />;
}

export default Kakao;
