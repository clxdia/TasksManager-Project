import { UserContext } from "@/hooks/userContext";
import Task from "@/interfaces/Task";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AddTask = () => {
  const { user } = useContext(UserContext);

  const [currentDate, setCurrentDate] = useState<string>("");
  const [task, setTask] = useState<Task>({
    _id: "",
    title: "",
    desc: "",
    due_date: 0,
    tags: [],
    author: "",
    completed: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let inputValue: string | boolean = value;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: inputValue,
    }));
  };

  const handleAddTask = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTask = {
      ...task,
      author: user ? user.name : "",
      completed: false,
    };
    axios
      .post(process.env.MONGODB_URL + "/tasks", newTask)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  return (
    <form className="menu__modal__form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Add a title"
        value={task.title}
        onChange={handleInputChange}
      />
      <label htmlFor="desc">Task details</label>
      <textarea
        maxLength={300}
        name="desc"
        placeholder="Describe your task"
        value={task.desc}
        onChange={handleInputChange}
      />
      <div className="date__priority">
        <div className="date">
          <label htmlFor="due_date">Due date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            min={currentDate}
            value={task.due_date}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        name="tags"
        placeholder="Optional"
        value={task.tags}
        onChange={handleInputChange}
      />
      <div className="buttons">
        <button
          className="buttons__addtask"
          type="submit"
          onClick={handleAddTask}
        >
          Add Task
        </button>
        <button
          className="buttons__cancel"
          type="submit"
          onClick={handleAddTask}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTask;
