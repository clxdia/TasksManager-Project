import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Intro from "./Intro";
import SignUp from "./SignUp";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setUser: (user: any) => void;
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

  const toggleComponent = () => {
    setActiveComponent(activeComponent === "login" ? "signup" : "login");
  };

  return (
    <div className="parallax">
      <section className="login">
        <div className="login__image"></div>
        <div className="form__container">
          <div className="form">
            <div className="form__buttons">
              <button
                className={
                  activeComponent === "login"
                    ? "form__buttons--active"
                    : "form__buttons--inactive"
                }
                onClick={() => setActiveComponent("login")}
              >
                <h1>Login</h1>
              </button>
              <button
                className={
                  activeComponent === "signup"
                    ? "form__buttons--active"
                    : "form__buttons--inactive"
                }
                onClick={() => setActiveComponent("signup")}
              >
                <h1>Sign up</h1>
              </button>
            </div>

            {activeComponent === "signup" ? (
              <SignUp toggleLogin={toggleComponent} />
            ) : (
              <div>
                <h2>
                  Welcome back! Please log in with your credentials to access
                  your tasks.
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
                      <button onClick={toggleComponent}>
                        Please click here to sign up.
                      </button>
                    </p>
                  )}
                </form>
                <p>
                  New user?{" "}
                  <button onClick={toggleComponent}>
                    <u>Sign up!</u>
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section-home">
        <Intro />
      </section>
    </div>
  );
};

export default Login;
