import React from "react";
import styled from "lib/styled";

import { Link, useHistory } from "react-router-dom";

import { RootState } from "modules";
import { logout } from "modules/login";

import { useSelector, useDispatch } from "react-redux";

const Nav = styled.nav`
  width: 100%;
  height: 100px;
  float: left;
  background-color: ${(props) => props.theme.color.WHITE_LIGHT};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  position: fixed;
  z-index: 998;
  user-select: none;

  & + * {
    clear: both;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  line-height: 100px;
  float: right;
  margin-right: 1%;

  & > li {
    list-style: none;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  float: left;
  margin-right: 24px;

  & > * {
    text-decoration: none;
    color: ${(props) => props.theme.color.BLACK_LIGHT};
    transition: all 0.3s ease;
    font-size: 1.15rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      filter: brightness(75%);
    }
  }
`;

const Logo = styled.span`
  display: inline-block;
  float: left;
  line-height: 100px;
  margin-left: 3%;
  font-size: 1.5rem;
  font-weight: 300;
  color: ${(props) => props.theme.color.PRIMARY};
`;

type Props = {};

function Header(props: Props) {
  const { userId } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Nav>
      <Logo>맛플레이스</Logo>
      <List>
        <ListItem></ListItem>
        <ListItem>
          <Link to="/">메인</Link>
        </ListItem>
        {userId ? (
          <ListItem
            onClick={(e) => {
              dispatch(logout());
              history.push("/");
            }}
          >
            <span>로그아웃</span>
          </ListItem>
        ) : (
          <ListItem>
            <Link to="/login">로그인/회원가입</Link>
          </ListItem>
        )}
        <ListItem>
          <Link
            onClick={(e) => {
              if (!userId) {
                e.preventDefault();
                alert("로그인 먼저 해주세요!");
                history.push("/login");
              }
            }}
            to={`/users/${userId}`}
          >
            내 맛집 리스트
          </Link>
        </ListItem>
      </List>
    </Nav>
  );
}

export default Header;
