"use client";

import LoadingHomepage from "@/components/Loading";
import { UserContext } from "@/hooks/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Homepage from "../components/Homepage";
import Login from "../components/Login";

const App = () => {
  const { setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const tasksResponse = await axios.get(
            process.env.MONGODB_URL + "/tasks"
          );
          const tasks = tasksResponse.data;

          const usersResponse = await axios.get(
            process.env.MONGODB_URL + "/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = usersResponse.data;

          setUser(userData[0]);
          document.cookie = `user=${JSON.stringify(userData[0])}; path=/`;
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingHomepage />
      ) : isLoggedIn ? (
        <div>
          <Homepage />
        </div>
      ) : (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setLoading={setLoading}
          setUser={setUser}
        />
      )}
    </>
  );
};

export default App;
