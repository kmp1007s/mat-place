import React, { useEffect, useState } from "react";
import Place from "component/Place/Place";

import { Place as TypePlace } from "api/place";
import { imageSearch } from "api/kakao/place";

type Props = TypePlace & {};

function PlaceContainer(props: Props) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    imageSearch({ keyword: props.name, size: 1 }).then((res) => {
      const data: any = res.data;
      const documents = data.documents;
      // 검색된 문서가 한개라도 있다면
      if (documents.length > 0) {
        const url = documents[0].thumbnail_url;
        setImgUrl(url);
      }
    });
  }, [props]);

  return (
    <>
      <Place {...props} imgUrl={imgUrl} />
    </>
  );
}

export default PlaceContainer;
