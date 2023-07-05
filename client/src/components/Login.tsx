import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import SignUp from "./SignUp";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setUser: (user: any) => void;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
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
      .post(process.env.MONGODB_URL + "/login", { name, password })
      .then((result) => {
        if (result.data.message === "Correct data") {
          document.cookie = `token=${result.data.token}; path=/`;
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

  const toggleComponent = () => {
    setActiveComponent(activeComponent === "login" ? "signup" : "login");
  };

  return (
    <div className="login">
      <div
        className={
          activeComponent === "login" ? "login__image" : "signup__image"
        }
      ></div>
      <div className="login__form">
        <div className="login__form__buttons">
          <button
            className={
              activeComponent === "login"
                ? "login__form__buttons--active"
                : "login__form__buttons--inactive"
            }
            onClick={() => setActiveComponent("login")}
          >
            <h1>Login</h1>
          </button>
          <button
            className={
              activeComponent === "signup"
                ? "login__form__buttons--active"
                : "login__form__buttons--inactive"
            }
            onClick={() => setActiveComponent("signup")}
          >
            <h1>Sign up</h1>
          </button>
        </div>

        {activeComponent === "signup" ? (
          <SignUp toggleLogin={toggleComponent} />
        ) : (
          <>
            <h2>
              Welcome back! Please log in with your credentials to access your
              tasks.
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
              <button onClick={handleSubmit}>Login</button>
              {incorrectData && (
                <p>Invalid username or password. Please try again.</p>
              )}
              {noUser && (
                <p>
                  No account registered with this username.
                  <button onClick={toggleComponent}>
                    Please click here to sign up.
                  </button>
                </p>
              )}
            </form>
            <p>
              New user?{" "}
              <button className="warning" onClick={toggleComponent}>
                <u>Sign up!</u>
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
