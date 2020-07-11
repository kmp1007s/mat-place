import React, { useState } from "react";
import AddInputBox from "component/Place/AddInputBox";
import { useDispatch } from "react-redux";
import { addPlaceList } from "modules/placeList";

type Props = {
  onPositiveButtonClick?: Function;
  onNegativeButtonClick?: Function;
};

function AddInputBoxContainer(props: Props) {
  const [selectedPlaces, setSelectedPlaces] = useState<Array<any>>([]);
  const [inputTitle, setInputTitle] = useState("");

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
      onPositiveButtonClick={
        props.onPositiveButtonClick
          ? props.onPositiveButtonClick
          : () => {
              const places = selectedPlaces.map((item, idx) => ({
                id: item.id,
                name: item.place_name,
              }));

              dispatch(
                addPlaceList({
                  title: inputTitle,
                  places,
                })
              );
            }
      }
      onNegativeButtonClick={
        props.onNegativeButtonClick ? props.onNegativeButtonClick : () => {}
      }
    />
  );
}

export default AddInputBoxContainer;
