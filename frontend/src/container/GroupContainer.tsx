import React, { useState, useEffect } from "react";
import GroupItem from "component/Common/Group/GroupItem";

import styled from "lib/styled";

import { getGroupByUser, Group, createGroup } from "api/place";
import TopAlert from "component/Common/TopAlert";
import Input from "component/Common/Input";
import Button from "component/Common/Button";

const Wrapper = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
`;

const AddButton = styled.li`
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
  className?: string;
  onListItemClick: Function;
  userId: string;
  showAdd: boolean;
};

function GroupContainer(props: Props) {
  const [groups, setGroups] = useState<Array<Group> | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetch() {
      const { data } = await getGroupByUser(props.userId);
      setGroups(data);
    }

    fetch();
  }, [props.userId]);

  return (
    <>
      <Wrapper className={props.className}>
        {groups?.map((group, idx) => (
          <GroupItem
            key={idx}
            group={group}
            onListItemClick={props.onListItemClick}
          />
        ))}
        {props.showAdd && (
          <AddButton
            onClick={(e) => {
              setIsAddMode(true);
            }}
          >
            그룹 추가
          </AddButton>
        )}
      </Wrapper>
      {isAddMode && (
        <TopAlert
          onClose={() => {
            setIsAddMode(false);
          }}
        >
          <div>
            <Input
              type="text"
              placeholder="추가할 그룹 이름"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={async (e) => {
              const { data } = await createGroup({
                name: input,
              });
              if (groups) {
                setGroups(groups.concat(data));
              } else {
                setGroups([data]);
              }
              setIsAddMode(false);
            }}
          >
            확인
          </Button>
          <Button
            onClick={(e) => {
              setIsAddMode(false);
            }}
          >
            취소
          </Button>
        </TopAlert>
      )}
    </>
  );
}

export default GroupContainer;
