"use client";

import getUsernameFromCookie from "@/hooks/getUserCookie";
import Image from "next/image";
import React from "react";
import friend1 from "../assets/random/friend1.png";
import Calendar from "./Calendar";

interface Props {
  completedTasksCount: number;
  inProgressTasksCount: number;
}

const Welcome = ({ inProgressTasksCount, completedTasksCount }: Props) => {
  const user = getUsernameFromCookie();

  return (
    <header>
      <div className="header__welcome card">
        <div>
          {user ? <h1>Hello, {user.name}!</h1> : <h1>Loading user...</h1>}
          <h2>Here&#39;s today&#39;s tasks</h2>
        </div>
        <Image src={friend1} width="500" height="500" alt="friend" />
      </div>
      <div className="header__data">
        <div className="calendar">
          <Calendar />
        </div>
        <div className="tracking card">
          <div className="tracking__progress">
            <h3>{inProgressTasksCount}</h3>
            <h4>
              tasks<span>in progress</span>
            </h4>
          </div>
          <div className="tracking__completed">
            <h3>{completedTasksCount}</h3>
            <h4>
              tasks<span>completed</span>
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Welcome;
