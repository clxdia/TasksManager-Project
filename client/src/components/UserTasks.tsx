import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import AddTask from "./AddTask";

interface Task {
  _id: string;
  title: string;
  desc: string;
  due_date: number;
  priority: string;
  tags: string[];
  name: string;
  username: string;
  author: string;
}

const UserTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("token");
    axios
      .get("http://localhost:3005/tasks/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <ul className="task_ui">
        {tasks.map((task) => (
          <li key={task?._id} className="tasks_card">
            <p>{task?.title}</p>
            <p>{task?.desc}</p>
            <p>{task?.due_date}</p>
            <p>{task?.priority}</p>
            <ul>
              {task.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
            <p>@{task.author}</p>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
export default UserTasks;
