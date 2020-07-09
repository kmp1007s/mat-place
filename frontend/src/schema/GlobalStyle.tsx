import React from "react";
import { Global, css } from "@emotion/core";
import * as theme from "./colors";

const createCSS = () => {
  const keys = Object.keys(theme);
  const values = Object.values(theme);

  let style = ":root{";

  for (let i = 0; i < keys.length; i++) {
    style += `--${keys[i].toLowerCase()}: ${values[i]};\n`;
  }

  style += "}";

  return style;
};

function SetColor() {
  return (
    <Global
      styles={css`
        ${createCSS()}
      `}
    />
  );
}

export default SetColor;
