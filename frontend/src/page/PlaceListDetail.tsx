import React from "react";
import { RouteComponentProps } from "react-router-dom";

type MatchParams = {
  id: string;
};

function PlaceListDetail({ match }: RouteComponentProps<MatchParams>) {
  const placeListId = match.params.id;
  return (
    <div>
      <h4>리스트 1</h4>
      <div>
        <div>연돈</div>
        <div>053-321-2277</div>
        <div>카카오 상세정보</div>
      </div>
      <div>
        <div>root1234</div>
        <div>김지원</div>
      </div>
    </div>
  );
}

export default PlaceListDetail;
