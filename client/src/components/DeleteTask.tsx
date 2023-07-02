import React from "react";
import Cookies from "universal-cookie";

import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

import Task from "@/interfaces/task";

interface TaskProps {
  task: Task;
}

const DeleteTask: React.FC<TaskProps> = ({ task }) => {
  const handleDelete = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    alert("are you sure you want to delete this task?");
    axios
      .delete(`http://localhost:3005/tasks/${task?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log("task deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error deleting task: ", error);
      });
  };

  return (
    <div>
      <AiOutlineDelete onClick={handleDelete} />
    </div>
  );
};

export default DeleteTask;
