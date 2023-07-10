"use client";
import Menu from "@/components/Menu";
import UserTasks from "@/components/UserTasks";
import Image from "next/image";
import useFetchData from "../hooks/fetchData";

import Task from "@/interfaces/Task";
import CompletedTasks from "./CompletedTasks";
import Welcome from "./Welcome";

export default function Homepage(): JSX.Element {
  const tasks = useFetchData("/tasks/others");

  return (
    <div className="homepage">
      <Menu />
      <main className="main">
        <Welcome />
        <div className="tasks">
          <div className="tasks__user tasks__containers">
            <h3>MY TASKS</h3>
            <UserTasks />
          </div>

          <div className="tasks__all tasks__containers">
            <h3>ALL</h3>
            <ul className="tasks__all__cards">
              {tasks?.map((task: Task) => (
                <li key={task._id} className="tasks__ui tasks__ui-all">
                  <div className="title__icon">
                    <h4>{task?.title}</h4>{" "}
                    <div>
                      <Image
                        width="35"
                        className="pfp"
                        alt="profile picture"
                        src={"/pfp.jpg"}
                        height="35"
                      />
                    </div>
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
                    <p>{task?.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="tasks__completed tasks__containers">
            <h3>COMPLETED</h3>
            <CompletedTasks />
          </div>
        </div>
      </main>
    </div>
  );
}
