import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/fetchData";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import Task from "@/interfaces/Task";

const UserTasks = () => {
  const tasks = useFetchData("/tasks/user");

  return (
    <ul className="tasks__user__cards">
      {tasks?.map((task: Task) => (
        <li key={task?._id} className="tasks__ui">
          <div className="title__icon">
            <h4>{task?.title}</h4>
          </div>
          <div>
            <p className="desc">{task?.desc}</p>
            <p>{task?.due_date}</p>

            <ul className="tags">
              {task.tags.map((tag) => (
                <li key={tag}>
                  <p>#{tag}</p>
                </li>
              ))}
            </ul>
          </div>
          <hr></hr>
          <div className="content__below">
            <EditTask task={task} />
            <DeleteTask task={task} />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default UserTasks;
