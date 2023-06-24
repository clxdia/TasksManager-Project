import { UserContext } from "@/hooks/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface Task {
  title: string;
  desc: string;
  due_date: string;
  priority: string;
  tags: string;
  author: string;
}

const AddTask = () => {
  // const { user } = useContext(UserContext);
  const [open, setOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [task, setTask] = useState<Task>({
    title: "",
    desc: "",
    due_date: "",
    priority: "",
    tags: "",
    author: "clxdia",
  });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleNewTask = () => {
    setOpen(!open);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value, type, checked } = e.target;
    // const inputValue = type === "checkbox" ? checked : value;
    // setTask((prevTask) => ({
    //   ...prevTask,
    //   [name]: inputValue,
    // }));
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post("http://localhost:3005/tasks", task);
      console.log("task added:", task);
    } catch (error) {
      console.log("error adding task", error);
    }
  };

  return (
    <div>
      <button onClick={handleNewTask}>Add new task!</button>
      {open && (
        <form>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleInputChange}
          />
          <textarea
            maxLength={300}
            name="desc"
            placeholder="Describe your task"
            value={task.desc}
            onChange={handleInputChange}
          />
          <input
            type="date"
            id="due_date"
            name="due_date"
            min={currentDate}
            value={task.due_date}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleInputChange}
          />
          <label htmlFor="priority">Urgent</label>
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={task.tags}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={task.author}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask}>Add task</button>
        </form>
      )}
    </div>
  );
};

export default AddTask;
