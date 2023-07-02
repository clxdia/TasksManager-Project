"use client";

import useFetchData from "@/hooks/fetchData";
import { UserContext } from "@/hooks/userContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [incorrectData, setIncorrectData] = useState<boolean>(false);
  const [noUser, setNoUser] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIncorrectData(false);
    setNoUser(false);
    axios
      .post(
        "http://localhost:3005/login" || process.env.MONGODB_URL + "/login",
        { name, password }
      )
      .then((result) => {
        if (result.data.message === "Correct data") {
          document.cookie = `token=${result.data.token}; path=/`;

          router.push("/homepage");
        } else if (result.data === "Invalid username or password") {
          setIncorrectData(true);
        } else {
          setNoUser(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const tasksResponse = await axios.get(
            "http://localhost:3005/tasks" || process.env.MONGODB_URL + "/tasks"
          );
          const tasks = tasksResponse.data;

          const usersResponse = await axios.get(
            "http://localhost:3005/users" || process.env.MONGODB_URL + "/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = usersResponse.data;

          setUser(userData[0]);
          document.cookie = `user=${JSON.stringify(userData[0])}; path=/`;
        } catch (error) {
          console.log(error);
        }
      }
    };

    setTimeout(fetchData, 100);
  }, []);

  return (
    <div className="login">
      <div className="login__image"></div>
      <div className="login__form">
        <h1>Login</h1>
        <h2>
          Welcome back! Please log in with your credentials to access your
          tasks.
        </h2>
        <form>
          <label htmlFor="username">Username</label>
          <input
            placeholder="Enter your username"
            type="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
          {incorrectData && (
            <p>Invalid username or password. Please try again.</p>
          )}
          {noUser && (
            <p>
              No account registered with this username.{" "}
              <Link href="/sign-up">Please click here to sign up.</Link>
            </p>
          )}
        </form>
        <p>
          New user? <Link href="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
