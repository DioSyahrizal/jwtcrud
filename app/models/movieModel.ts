import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMovieModel {
  _id: string;
  name: string;
  release_on: string;
}

const MovieSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  released_on: {
    type: Date,
    trim: true,
    required: true
  }
});

export default mongoose.model("Movie", MovieSchema);
