import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/fetchData";
import EditTask from "../tools/EditTask";
import DeleteTask from "../tools/DeleteTask";
import Task from "@/interfaces/Task";
import AddCompleted from "../tools/MoveCompleted";

interface Props {
  myTasks: any;
}

const UserTasks = ({ myTasks }: Props) => {
  return (
    <ul className="tasks__user__cards">
      {myTasks?.map((task: Task) => (
        <li key={task?._id} className="tasks__ui">
          <div className="title__icon">
            <h4>{task?.title}</h4>
          </div>
          <div>
            <p className="desc">{task?.desc}</p>
            <p>{task?.due_date}</p>
            <ul className="tags">
              {task.tags.map((tag) => (
                <li className="tags__user" key={tag}>
                  <p>#{tag}</p>
                </li>
              ))}
            </ul>
          </div>
          <hr></hr>
          <div className="content__below">
            <EditTask task={task} />
            <DeleteTask task={task} />
            <AddCompleted task={task} />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default UserTasks;
