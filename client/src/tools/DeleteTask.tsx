import React, { useState } from "react";
import Cookies from "universal-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Task from "@/interfaces/Task";

interface TaskProps {
  task: Task;
}

function DeleteTask({ task }: TaskProps) {
  const [ask, setAsk] = useState<boolean>(false);

  const handleDelete = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    axios
      // .delete(process.env.MONGODB_URL + `/tasks/${task?._id}`, {
      .delete(process.env.MONGODB_URL + `/tasks/${task?._id}`, {
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

  if (ask) {
    return (
      <div className="menu__modal">
        <div className="menu__modal__ui menu__modal__ui--ask">
          <h1>Are you sure you want to delete this task?</h1>
          <h2>This action cannot be undone.</h2>
          <div className="buttons">
            <button className="buttons__delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="buttons__cancel" onClick={() => setAsk(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AiOutlineDelete onClick={() => setAsk(true)} />
    </div>
  );
}

export default DeleteTask;
