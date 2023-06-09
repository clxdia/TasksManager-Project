import express from "express";
import { connectToDb, getDatabase } from "./mongodb/database.js";
import cors from "cors";
import { Db } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

let database;

connectToDb((err) => {
  if (!err) {
    app.listen(3005, () => {
      console.log("app listening on port 3005");
    });
    database = getDatabase();
  }
});

app.get("/users", (req, res) => {
  let users = [];
  database
    .collection("users")
    .find()
    .sort({ title: 1 })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch users" });
    });
});

app.get("/tasks", (req, res) => {
  let tasks = [];
  database
    .collection("tasks")
    .find()
    .sort({ title: 1 })
    .forEach((task) => tasks.push(task))
    .then(() => {
      res.status(200).json(tasks);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch tasks" });
    });
});

app.post("/users", (req, res) => {
  let user = req.body;
  database
    .collection("users")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: `could not add user; error: ${err}` });
    });
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
    console.log(e);
  }
});
