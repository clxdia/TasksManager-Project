import React from "react";
import DeleteTask from "../tools/DeleteTask";
import Task from "@/interfaces/Task";

interface Props {
  completedTasks: any;
}

export default function CompletedTasks({ completedTasks }: Props): JSX.Element {
  return (
    <ul className="tasks__user__cards">
      {completedTasks?.map((task: Task) => (
        <li key={task?._id} className="tasks__ui">
          <div className="title__icon">
            <h4>{task?.title}</h4>
          </div>
          <div>
            <p className="desc">{task?.desc}</p>
            <p className="date">{task?.due_date}</p>
            <div className="tags__wrapper">
              <ul className="tags">
                {task?.tags?.map((tag) => (
                  <li className="tags__completed" key={tag}>
                    <p>#{tag}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="content__below content__below--completed">
            <hr></hr>
            <div className="content__below__icons">
              <DeleteTask task={task} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
