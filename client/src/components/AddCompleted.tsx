import Task from "@/interfaces/Task";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface CompletedTaskProp {
  task: Task;
}

const AddCompleted: React.FC<CompletedTaskProp> = ({ task }) => {
  const cookies = new Cookies();

  const handleComplete = () => {
    const token = cookies.get("token");
    const completedTask = { ...task, completed: true };
    axios
      .patch(`http://localhost:3005/tasks/${task?._id}`, completedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Task updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating task: ", error);
      });
  };

  return (
    <div>
      <AiOutlineCheckCircle onClick={handleComplete} />
    </div>
  );
};

export default AddCompleted;
