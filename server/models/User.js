import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: [3, "Name should be at least 3 characters long"],
    maxLength: [30, "Name should be less than 30 characters"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/,
    //   "Invalid email address",
    // ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
