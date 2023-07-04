import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import generateLogToken from "../utils/tokenGenerator.js";
import cookieParser from "cookie-parser";
import authenticateToken from "../middleware/authenticateToken.js";
import taskRoutes from "../routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.7ebrdzp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl);

app.use("/tasks", taskRoutes);

app.get("/users", authenticateToken, (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  UserModel.findOne({ name: name })
    .select("+password")
    .then((user) => {
      if (user) {
        console.log("Password:", password);
        console.log("User Password:", user.password);
        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          if (match) {
            const token = generateLogToken(user);
            res.setHeader("Set-Cookie", `user=${JSON.stringify(user)}; Path=/`);
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: token,
              message: "Correct data",
            });
          } else {
            res.json("Invalid username or password");
          }
        });
      } else {
        res.json("No account registered with this username");
      }
    });
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  UserModel.findOne({ email }).then((existingEmail) => {
    if (existingEmail) {
      return res.status(409).json({ message: "Double email" });
    }
  });

  UserModel.findOne({ name }).then((existingUsername) => {
    if (existingUsername) {
      return res.status(409).json({ message: "Double username" });
    }
  });

  bcrypt.hash(password, 10).then((hashedPassword) => {
    UserModel.create({ name, email, password: hashedPassword })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  });
});

app.listen(3005, () => {
  console.log("app listening on port 3005");
});
