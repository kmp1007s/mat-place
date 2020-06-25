import styled, { CreateStyled } from "@emotion/styled";
import * as colors from "schema/colors";

const color = { ...colors };

type Theme = {
  color: typeof color;
};

export type ThemeProps = {
  theme: Theme;
};

export default styled as CreateStyled<Theme>;
