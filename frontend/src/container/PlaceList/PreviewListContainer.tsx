import React, { useEffect, useState } from "react";
import PreviewList from "component/Place/PreviewList";

import { getAllPublicPlaceLists, PlaceLists } from "api/place";
import { imageSearch } from "api/kakao/place";

import styled from "lib/styled";

import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const Wrapper = styled.div`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.color.GRAY_LIGHT};
  padding: 12px 0;
  margin: auto;
  width: 50%;
  border-radius: 4px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.color.WHITE};
`;

const LeftArrow = styled(AiOutlineCaretLeft)`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.color.GRAY};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  }
`;
const RightArrow = styled(AiOutlineCaretRight)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.color.GRAY};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.color.PRIMARY_LIGHT};
  }
`;

function PreviewListContainer() {
  const [placeLists, setPlaceLists] = useState<PlaceLists>(null);
  const [placeListsToShow, setPlaceListsToShow] = useState<PlaceLists>(null);
  const [imgUrls, setImgUrls] = useState<Array<string> | null>(null);
  const [curIdx, setCurIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  const listsInPageCnt = 5;

  useEffect(() => {
    async function fetchDatas() {
      const { data: placeLists } = await getAllPublicPlaceLists();
      let urlsToAppend: Array<string> | null = null;

      if (placeLists) {
        // urlsToAppend = [];
        // for (let placeList of placeLists) {
        //   const place = placeList.places[0];
        //   const { data }: any = await imageSearch({
        //     keyword: place.name,
        //     size: 1,
        //   });
        //   const documents = data.documents;
        //   // 검색된 문서가 한개라도 있다면
        //   if (documents.length > 0) {
        //     const url = documents[0].thumbnail_url;
        //     urlsToAppend.push(url);
        //   }
        // }

        let remainListsCount = placeLists.length;
        let endIdx = 0;

        while (0 < remainListsCount) {
          endIdx++;
          remainListsCount -= listsInPageCnt;

          if (remainListsCount < 5) break;
        }

        setPlaceLists(placeLists);
        setImgUrls(urlsToAppend);
        setPlaceListsToShow(
          placeLists ? placeLists.slice(0, listsInPageCnt) : null
        );
        setEndIdx(endIdx);
      }
    }
    fetchDatas();
  }, []);

  useEffect(() => {
    if (placeLists) {
      const startIdx = curIdx * listsInPageCnt;

      setPlaceListsToShow(
        placeLists.slice(startIdx, startIdx + listsInPageCnt)
      );
    }
  }, [placeLists, curIdx]);

  return (
    <>
      {placeListsToShow && (
        <Wrapper>
          <LeftArrow
            size={28}
            onClick={(e) => {
              if (curIdx !== 0) {
                setCurIdx(curIdx - 1);
              }
            }}
          />
          <RightArrow
            size={28}
            onClick={(e) => {
              if (curIdx < endIdx) {
                setCurIdx(curIdx + 1);
              }
            }}
          />

          {placeListsToShow.map((placeList, idx) => (
            <PreviewList
              {...placeList}
              key={placeList._id}
              path={imgUrls ? imgUrls[idx] : ""}
            />
          ))}
        </Wrapper>
      )}
    </>
  );
}

export default PreviewListContainer;
