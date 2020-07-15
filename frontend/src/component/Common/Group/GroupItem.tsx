import React from "react";
import styled from "lib/styled";

import { Group } from "api/place";
import { AiOutlineClose } from "react-icons/ai";

const List = styled.li`
  padding: 16px;
  list-style: none;
  color: ${(props) => props.theme.color.WHITE};
  width: 250px;

  & .text {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.color.GRAY_LIGHT};
    }
  }
`;

const CloseBtn = styled(AiOutlineClose)`
  float: right;
  cursor: pointer;
`;

type Props = {
  group: Group;
  onListItemClick: Function;
  onDeleteClick: Function;
};

function GroupItem(props: Props) {
  return (
    <List>
      <span
        className="text"
        onClick={(e) => {
          if (props.onListItemClick) props.onListItemClick(props.group);
        }}
      >
        {props.group.name}
      </span>
      <CloseBtn
        onClick={() => {
          props.onDeleteClick(props.group);
        }}
      />
    </List>
  );
}

export default GroupItem;
