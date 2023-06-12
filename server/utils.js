import UserModel from "./models/User";
import jwt from "jsonwebtoken";

const generateLogToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_PASS || "****",
    {
      expiresIn: "10d",
    }
  );
};
export default generateLogToken;
