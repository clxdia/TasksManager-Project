"use client";

import React, { createContext, useEffect, useState } from "react";

interface User {
  user: {
    name: string;
    email: string;
    password: string;
  } | null;

  setUser: (user: any) => void;
}

const UserContext = createContext<User>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: any;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userDataFromCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("user="));

    const parsedUserData = userDataFromCookie
      ? JSON.parse(userDataFromCookie.split("=")[1])
      : null;

    setUser(parsedUserData);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
