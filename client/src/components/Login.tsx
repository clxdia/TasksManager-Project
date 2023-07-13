import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Intro from "./Intro";
import SignUp from "./SignUp";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
  toggleLogin: () => void;
}

const Login = ({ setIsLoggedIn, toggleLogin }: LoginProps) => {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [incorrectData, setIncorrectData] = useState<boolean>(false);
  const [noUser, setNoUser] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<"login" | "signup">(
    "login"
  );

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIncorrectData(false);
    setNoUser(false);
    axios
      // .post(process.env.MONGODB_URL + "/login", { name, password })
      .post(`http://localhost:3005` + "/login", { name, password })
      .then((result) => {
        if (result.data.message === "Correct data") {
          document.cookie = `token=${result.data.token}; path=/`;
          document.cookie = `user=${JSON.stringify(result.data)}; path=/`;

          setIsLoggedIn(true);
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

  return (
    <div>
      <h2>
        Welcome back! Please log in with your credentials to access your tasks.
      </h2>
      <form>
        <label htmlFor="username">Username</label>
        <input
          placeholder="Enter your username"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit} className="rainbow__button">
          Login
        </button>
        {incorrectData && (
          <p>Invalid username or password. Please try again.</p>
        )}
        {noUser && (
          <p>
            No account registered with this username.
            <button onClick={() => setActiveComponent("signup")}>
              Please click here to sign up.
            </button>
          </p>
        )}
      </form>
      <p>
        New user?{" "}
        <button onClick={toggleLogin}>
          <u>Sign up!</u>
        </button>
      </p>
    </div>
  );
};

export default Login;
