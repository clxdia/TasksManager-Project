"use client";

import Image from "next/image";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import friend1 from "../assets/random/friend1.png";

const Welcome = () => {
  const getUsernameFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === "user") {
        return JSON.parse(decodeURIComponent(cookie[1]));
      }
    }
    return null;
  };

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
      <div className="header__search">
        <div className="search card">
          <BiSearchAlt size={25} />
        </div>
        <div className="tracking-date">
          <div className="tracking card">
            <div className="tracking__progress">
              <h3>03</h3>
              <h4>
                tasks<span>in progress</span>
              </h4>
            </div>
            <div className="tracking__completed">
              <h3>12</h3>
              <h4>
                tasks<span>completed</span>
              </h4>
            </div>
          </div>
          <div className="date card">
            <h3>16</h3>
            <h4>
              july<span>Monday</span>
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Welcome;
