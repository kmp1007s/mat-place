import React from "react";
import styled from "lib/styled";

import { Group } from "api/place";

const List = styled.li`
  padding: 16px;
  list-style: none;
  color: ${(props) => props.theme.color.WHITE};
  width: 250px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.color.GRAY_LIGHT};
  }
`;

type Props = {
  group: Group;
  onListItemClick: Function;
};

function GroupItem(props: Props) {
  return (
    <List
      onClick={(e) => {
        if (props.onListItemClick) props.onListItemClick(props.group);
      }}
    >
      {props.group.name}
    </List>
  );
}

export default GroupItem;
