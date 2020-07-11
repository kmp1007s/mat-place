import React, { useState } from "react";
import AddInputBox from "component/Place/AddInputBox";
import { useDispatch } from "react-redux";
import { addPlaceList } from "modules/placeList";

type Props = {
  existPlaces?: Array<any>;
  existTitle?: string;
  onPositiveButtonClick?: Function;
  onNegativeButtonClick?: Function;
};

function AddInputBoxContainer(props: Props) {
  const [selectedPlaces, setSelectedPlaces] = useState<Array<any>>(
    props.existPlaces
      ? props.existPlaces.map((item) => ({
          id: item.id,
          place_name: item.name,
        }))
      : []
  );
  const [inputTitle, setInputTitle] = useState(props.existTitle || "");

  const dispatch = useDispatch();

  return (
    <AddInputBox
      selectedPlaces={selectedPlaces}
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
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
        }));

        if (props.onPositiveButtonClick) {
          props.onPositiveButtonClick(inputTitle, places);
          return;
        }

        dispatch(
          addPlaceList({
            title: inputTitle,
            places,
          })
        );
      }}
      onNegativeButtonClick={
        props.onNegativeButtonClick ? props.onNegativeButtonClick : () => {}
      }
    />
  );
}

export default AddInputBoxContainer;
