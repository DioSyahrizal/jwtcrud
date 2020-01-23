import mongoose from "mongoose";

export interface UserModel extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});

export default mongoose.model<any>("User", UserSchema);
