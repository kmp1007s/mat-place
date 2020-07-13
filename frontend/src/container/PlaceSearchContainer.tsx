import React, { useState } from "react";

import Search from "component/Common/PlaceSearch/Search";
import ListWrapper from "component/Common/PlaceSearch/ListWrapper";
import Wrapper from "component/Common/PlaceSearch/Wrapper";
import ListItem from "component/Common/PlaceSearch/ListItem";

import { keywordSearch } from "api/kakao/place";

type Props = {
  onListItemClick: Function;
};

function PlaceSearchContainer(props: Props) {
  const [searchResult, setSearchResult] = useState<Array<any> | null>([]);
  const [showList, setShowList] = useState(true);

  const onSearch = async (input: string) => {
    const data: any = (await keywordSearch(input)).data;
    const docs = data.documents;

    // 검색 결과가 없으면
    if (docs.length < 1) {
      setSearchResult(null);
    } else {
      setSearchResult(docs);
    }
  };

  const onFocus = () => {
    setShowList(true);
  };

  const onBlur = () => {
    setShowList(false);
  };

  return (
    <Wrapper onMouseOver={onFocus} onMouseLeave={onBlur}>
      <Search onSearch={onSearch} />
      {showList && (
        <ListWrapper>
          {searchResult ? (
            searchResult.map((item, idx) => (
              <ListItem
                key={idx}
                onClick={(e) => {
                  props.onListItemClick({
                    id: item.id,
                    place_name: item.place_name,
                    address_name: item.address_name,
                    phone: item.phone,
                  });
                }}
              >
                <div className="placeName">{item.place_name}</div>
                <div className="addressName">{item.address_name}</div>
              </ListItem>
            ))
          ) : (
            <ListItem className="noResult">
              <div>검색 결과가 없습니다</div>
            </ListItem>
          )}
        </ListWrapper>
      )}
    </Wrapper>
  );
}

export default PlaceSearchContainer;
