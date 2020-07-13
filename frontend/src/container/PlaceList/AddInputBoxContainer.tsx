import React, { useState } from "react";
import AddInputBox from "component/Place/AddInputBox";

type Props = {
  existPlaces?: Array<any>;
  existTitle?: string;
  existPublic?: boolean;
  onPositiveButtonClick?: Function;
  onNegativeButtonClick?: Function;
};

function AddInputBoxContainer(props: Props) {
  const [selectedPlaces, setSelectedPlaces] = useState<Array<any>>(
    props.existPlaces
      ? props.existPlaces.map((item) => ({
          id: item.id,
          place_name: item.name,
          address_name: item.address,
          phone: item.phone,
        }))
      : []
  );
  const [inputTitle, setInputTitle] = useState(props.existTitle || "");
  const [isPublic, setIsPublic] = useState(props.existPublic || false);

  return (
    <AddInputBox
      selectedPlaces={selectedPlaces}
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
      onListItemClick={(place: any) => {
        setSelectedPlaces((prevState) => {
          let haveToAppend = true;

          for (let i = 0; i < prevState.length; i++) {
            if (place.id === prevState[i].id) haveToAppend = false;
          }

          return haveToAppend ? [...prevState, place] : prevState;
        });
      }}
      onPositiveButtonClick={() => {
        const places = selectedPlaces.map((item, idx) => ({
          id: item.id,
          name: item.place_name,
          address: item.address_name,
          phone: item.phone,
        }));

        if (props.onPositiveButtonClick)
          props.onPositiveButtonClick(inputTitle, places, isPublic);
      }}
      onNegativeButtonClick={
        props.onNegativeButtonClick ? props.onNegativeButtonClick : () => {}
      }
    />
  );
}

export default AddInputBoxContainer;
