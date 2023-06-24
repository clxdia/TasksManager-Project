"use client";

import React, { createContext, useState } from "react";

interface UserContextProps {
  user: {
    name: string;
    email: string;
    password: string;
  } | null;

  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: any;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const userDataFromCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("user="));

  const [user, setUser] = useState<any>(() => {
    const parsedUserData = userDataFromCookie
      ? JSON.parse(userDataFromCookie.split("=")[1])
      : null;
    return parsedUserData;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
