import { Document } from "mongoose";

// interface Place {
//   id: string;
//   place_name: string;
//   category_name: string;
//   phone: string;
//   road_address_name: string;
//   place_url: string;
// }

interface PlaceListDocument extends Document {
  authorId: string;
  title: string;
  placeList: Array<String>;
  group: string;
}

export default PlaceListDocument;
