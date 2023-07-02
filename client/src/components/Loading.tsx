"use client";
import Menu from "@/components/Menu";
import UserTasks from "@/components/UserTasks";
import { UserContext } from "@/hooks/userContext";
import Image from "next/image";
import { useContext } from "react";
import useFetchData from "../hooks/fetchData";

import Task from "@/interfaces/Task";

export default function LoadingHomepage(): JSX.Element {
  return (
    <div className="homepage">
      <Menu />
      <main className="main">
        <header>
          <h2>Loading user</h2>
          <h1>Loading...</h1>
        </header>
        <div className="tasks">
          <div className="tasks__user tasks__containers">
            <h3>MINE</h3>
            {/* <UserTasks /> */}
          </div>
          <div className="tasks__all tasks__containers">
            <h3>ALL</h3>
            <ul className="tasks__all__loading">
              <svg className="loading" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </ul>
          </div>

          <div className="tasks__completed tasks__containers">
            <h3>COMPLETED</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
