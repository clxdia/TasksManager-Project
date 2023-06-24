"use client";

import { UserContext } from "@/hooks/userContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [incorrectData, setIncorrectData] = useState<boolean>(false);
  const [noUser, setNoUser] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIncorrectData(false);
    setNoUser(false);
    axios
      .post("http://localhost:3005/login", { email, password })
      .then((result) => {
        if (result.data.message === "Correct data") {
          document.cookie = `token=${result.data.token}; path=/`;
          router.push("/homepage");
        } else if (result.data === "Invalid email or password") {
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
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3005/tasks")
        .then((response) => {
          const tasks = response.data;
          axios
            .get("http://localhost:3005/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              const userData = response.data;
              setUser(userData[0]);
              document.cookie = `user=${JSON.stringify(userData[0])}; path=/`;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
          {incorrectData && <p>Invalid Email or password. Please try again.</p>}
          {noUser && (
            <p>
              No account registered with this email.{" "}
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
