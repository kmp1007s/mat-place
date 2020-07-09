import { Document } from "mongoose";

export interface Place {
  id: string;
  name: string;
}

export default interface PlaceListDocument extends Document {
  userId: string;
  title: string;
  places: Array<Place>;
  public: boolean;
  createdAt: Date;
}
