"use client";

import React from "react";

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
      {user ? <h2>Welcome back, {user.name} </h2> : <h2>loading user</h2>}
      <h1>Today&#39;s Tasks</h1>
    </header>
  );
};

export default Welcome;
