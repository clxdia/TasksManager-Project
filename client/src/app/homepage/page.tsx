"use client";
import AddTask from "@/components/AddTask";
import UserTasks from "@/components/UserTasks";
import { UserContext } from "@/hooks/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import useFetchData from "../../hooks/fetchData";

interface Task {
  id: string;
  title: string;
  desc: string;
  due_date: number;
  priority: string;
  tags: string[];
  name: string;
  username: string;
  author: string;
}

export default function Homepage(): JSX.Element {
  const { user } = useContext(UserContext);
  const tasks = useFetchData("tasks");

  return (
    <div className="homepage">
      <h1>Tasks</h1>
      {user ? <h2>welcome back, {user.name} </h2> : <h2>loading user</h2>}
      <div className="tasks">
        <div className="tasks__user">
          <UserTasks />
        </div>

        <div className="tasks__all">
          <h2>All Tasks</h2>
          <ul className="tasks_cards">
            {tasks?.map((task: Task) => (
              <li key={task.id} className="tasks_card">
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
                <p>{task.due_date}</p>
                <p>{task.priority}</p>
                <ul>
                  {task.tags.map((tags) => (
                    <li key={tags}>
                      <p>#{tags}</p>
                    </li>
                  ))}
                </ul>
                <p>{task.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
