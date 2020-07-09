import React from "react";
import { useState } from "react";

import Button from "component/Common/Button";
import Input from "component/Common/Input";
import styled from "lib/styled";

const InputWrapper = styled.p`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.WHITE};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  height: 50px;
  margin: 0;
  z-index: 996;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.color.PRIMARY_DARK};
  }
`;

const StyledInput = styled(Input)`
  margin: 0;
  height: 100%;
  padding: 0;
  padding-left: 4px;
  border: none;
  width: 300px;

  &:focus {
    border: none;
    color: ${(props) => props.theme.color.PRIMARY};
  }
`;

const StyledButton = styled(Button)`
  margin: 0;
  height: 100%;
  border: none;
  border-radius: 0;
  background-color: ${(props) => props.theme.color.GRAY};
  color: ${(props) => props.theme.color.WHITE};

  &:hover {
    border: none;
    background-color: ${(props) => props.theme.color.PRIMARY};
  }

  &:focus {
    background-color: ${(props) => props.theme.color.PRIMARY};
  }
`;

type Props = {
  onSearch: Function;
};

function PlaceSearch(props: Props) {
  const [inputKeyword, setInputKeyword] = useState("");

  return (
    <>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="ex) 대전 성심당"
          onKeyUp={(e) => {
            // Enter키를 입력 시
            if (e.key === "Enter") props.onSearch(inputKeyword);
          }}
          value={inputKeyword}
          onChange={(e) => {
            setInputKeyword(e.target.value);
          }}
        />
        <StyledButton
          onClick={(e) => {
            props.onSearch(inputKeyword);
          }}
        >
          검색
        </StyledButton>
      </InputWrapper>
    </>
  );
}

export default PlaceSearch;
