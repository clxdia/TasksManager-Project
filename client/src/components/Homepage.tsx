"use client";
import Menu from "@/components/Menu";
import UserTasks from "@/components/UserTasks";
import { UserContext } from "@/hooks/userContext";
import Image from "next/image";
import { useContext } from "react";
import useFetchData from "../hooks/fetchData";

import Task from "@/interfaces/Task";

export default function Homepage(): JSX.Element {
  const { user } = useContext(UserContext) || { user: null };
  const tasks = useFetchData("/tasks/others");

  return (
    <div className="homepage">
      <Menu />
      <main className="main">
        <header>
          {user ? <h2>Welcome back, {user.name} </h2> : <h2>loading user</h2>}
          <h1>Today's Tasks</h1>
        </header>
        <div className="tasks">
          <div className="tasks__user tasks__containers">
            <h3>MINE</h3>
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
            <UserTasks />
          </div>
        </div>
      </main>
    </div>
  );
}
