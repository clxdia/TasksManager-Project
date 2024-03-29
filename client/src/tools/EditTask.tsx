import Task from "@/interfaces/Task";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Cookies from "universal-cookie";

interface EditTaskProps {
  task: Task;
}

const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const [tagsArray, setTagsArray] = useState<string[]>(task.tags || []);
  const [tag, setTag] = useState<string>(tagsArray.join(", "));
  const cookies = new Cookies();

  useEffect(() => {
    setTagsArray(task.tags || []);
    setTag(tagsArray.join(", "));
  }, [task.tags, tagsArray]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTag(value);
    } else {
      let inputValue: string | boolean = value;
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        [name]: inputValue,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTaskWithTags = {
      ...updatedTask,
      tags: tag
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };
    const token = cookies.get("token");
    axios
      // .patch(process.env.MONGODB_URL + `/tasks/${task?._id}`, updatedTask, {
      .patch(
        process.env.MONGODB_URL + `/tasks/${task?._id}`,
        updatedTaskWithTags,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("task updated successfully");
        setIsEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error updating task: ", error);
      });
  };

  if (isEditing) {
    return (
      <div className="menu__modal">
        <div className="menu__modal__ui menu__modal__ui--editing">
          <h1>Editing task...</h1>
          <form onSubmit={handleSubmit} className="menu__modal__form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Add a title"
              value={updatedTask.title}
              onChange={handleInputChange}
            />
            <label htmlFor="desc">Task details</label>
            <textarea
              maxLength={300}
              name="desc"
              placeholder="Describe your task"
              value={updatedTask.desc}
              onChange={handleInputChange}
            />
            <div className="date__priority">
              <div className="date">
                <label htmlFor="due_date">Due date</label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={updatedTask.due_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Optional"
              value={tag}
              onChange={handleInputChange}
            />
            <div className="buttons">
              <button className="rainbow__button" type="submit">
                Save update
              </button>
              <button
                className="buttons__cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FiEdit size={16} onClick={handleEdit} />
    </div>
  );
};

export default EditTask;
