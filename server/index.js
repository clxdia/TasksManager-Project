import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import generateLogToken from "./utils/tokenGenerator.js";
import cookieParser from "cookie-parser";
import TaskModel from "./models/Task.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.7ebrdzp.mongodb.net/?retryWrites=true&w=majority`;
const mongodbUrl = `mongodb://localhost:27017/`;

mongoose.connect(mongodbUrl);

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  jwt.verify(token, process.env.JWT_PASS, (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decodedToken; // Attach the user information to the request object
    next();
  });
};

app.get("/tasks/user", authenticateToken, (req, res) => {
  const user = req.user;
  TaskModel.find({ author: user.name })
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not fetch tasks" });
    });
});

app.get("/tasks/others", authenticateToken, (req, res) => {
  const user = req.user;
  TaskModel.find({ author: { $ne: user.name } })
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not fetch tasks" });
    });
});

app.get("/tasks", (req, res) => {
  TaskModel.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not fetch tasks" });
    });
});

app.post("/tasks", (req, res) => {
  const newTask = new TaskModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    desc: req.body.desc,
    due_date: req.body.due_date,
    // priority: req.body.priority,
    tags: req.body.tags,
    author: req.body.author,
  });
  newTask
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "task created successfully",
        createdTask: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.errors) {
        const errorMessages = Object.values(err.errors).map(
          (error) => error.message
        );
        res.status(400).json({ errors: errorMessages });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    });
});

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
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .select("+password")
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          if (match) {
            const token = generateLogToken(user);
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: token,
              message: "Correct data",
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
