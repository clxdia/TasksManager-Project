import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import generateLogToken from "./utils.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.7ebrdzp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl);

app.get("/users", (req, res) => {
  const userId = req.session.id;
  UserModel.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (isMatch) {
          res.json({ message: "Correct data" }),
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              password: user.password,
              token: generateLogToken(user),
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
