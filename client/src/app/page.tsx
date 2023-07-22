"use client";

import Form from "@/components/Form";
import LoadingHomepage from "@/components/Loading";
import getUsernameFromCookie from "@/hooks/getUserCookie";
import { UserContext } from "@/hooks/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Homepage from "../components/Homepage";

const App = () => {
  const { setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      const user = getUsernameFromCookie();
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
            process.env.MONGODB_URL + "/users/" + `${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = usersResponse.data;

          if (userData) {
            setIsLoggedIn(true);
            document.cookie = `user=${JSON.stringify(userData)}; path=/`;
          } else {
            setIncorrectData(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [setUser]);

  return (
    <>
      {loading ? (
        <LoadingHomepage />
      ) : isLoggedIn ? (
        <Homepage />
      ) : (
        <Form
          setIsLoggedIn={setIsLoggedIn}
          setLoading={setLoading}
          setUser={setUser}
        />
      )}
    </>
  );
};

export default App;

function setIncorrectData(arg0: boolean) {
  throw new Error("Function not implemented.");
}
