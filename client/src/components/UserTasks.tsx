import React from "react";
import EditTask from "../tools/EditTask";
import DeleteTask from "../tools/DeleteTask";
import Task from "@/interfaces/Task";
import AddCompleted from "../tools/MoveCompleted";

interface Props {
  myTasks: any;
}

const UserTasks = ({ myTasks }: Props) => {
  return (
    <>
      <ul className="tasks__user__cards">
        {myTasks?.map((task: Task) => (
          <li key={task?._id} className="tasks__ui">
            <div className="title__icon">
              <h4>{task?.title}</h4>
            </div>
            <div>
              <p className="desc">{task?.desc}</p>
              <p className="date">{task?.due_date}</p>
              <div className="tags__wrapper">
                <ul className="tags">
                  {task.tags.map((tag) => (
                    <li className="tags__user" key={tag}>
                      <p>#{tag}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="content__below">
              <hr></hr>
              <div className="content__below__icons">
                <div className="content__below__icons__left">
                  <EditTask task={task} />
                  <DeleteTask task={task} />
                </div>
                <div>
                  <AddCompleted task={task} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* {isEditing ? (<>) : ()  } */}
    </>
  );
};
export default UserTasks;
