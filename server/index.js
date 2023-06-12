import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import generateLogToken from "./utils/tokenGenerator.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.7ebrdzp.mongodb.net/?retryWrites=true&w=majority`;
// const mongodbUrl = `mongodb://localhost:27017/`;

mongoose.connect(mongodbUrl);

app.get("/users", (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("pass:", password);
  UserModel.findOne({ email: email })
    .select("+password")
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          if (isMatch) {
            const token = generateLogToken(user);
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: token,
            });
          } else {
            res.json("Invalid email or password");
          }
        });
      } else {
        res.json("No account registered with this email");
      }
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hashedPassword) => {
    UserModel.create({ name, email, password: hashedPassword })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  });
});

app.listen(3005, () => {
  console.log("app listening on port 3005");
});
