import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as color from "schema/colors";

type LinkProps = {
  color?: string;
  size?: string | number;
};

export default styled(Link)<LinkProps>`
  text-decoration: none;
  position: relative;
  color: ${(props) => props.color || color.PRIMARY};
  font-size: ${(props) => props.size || 1}rem;

  &:hover {
    color: ${(props) => props.color || color.PRIMARY_DARK};
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 0%;
    height: 12%;
    background-color: ${(props) => props.color || color.PRIMARY};
    bottom: 1px;
    left: 50%;
    // left: -5%;
    transform: translateX(-50%);
    transition: all 0.5s;
  }

  &:hover::after {
    width: 100%;
    transition: all 0.5s;
    left: 50%;
    transform: translateX(-50%);
  }
`;
