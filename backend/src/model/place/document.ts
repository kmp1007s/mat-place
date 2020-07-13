import { Document } from "mongoose";

export interface Place {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export default interface PlaceListDocument extends Document {
  userId: string;
  title: string;
  places: Array<Place>;
  public: boolean;
  createdAt: Date;
}
