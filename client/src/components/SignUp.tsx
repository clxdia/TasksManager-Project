import axios from "axios";
import React, { FormEvent, useState } from "react";

interface SignUpProps {
  toggleLogin: () => void;
}

const SignUp = ({ toggleLogin }: SignUpProps) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [doubleEmail, setDoubleEmail] = useState<boolean>(false);
  const [doubleUsername, setDoubleUsername] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDoubleEmail(false);
    setDoubleUsername(false);
    axios
      .post(process.env.MONGODB_URL + "/users", { name, email, password })
      .then((result) => {
        console.log("new user added: ", result);
        toggleLogin();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Double email") {
            setDoubleEmail(true);
          } else if (errorMessage === "Double username") {
            setDoubleUsername(true);
          }
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="">
      <h2>
        Welcome! To get started, please create an account by providing your
        credentials.
      </h2>
      <form className="signup__form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Choose your username"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        {doubleUsername && (
          <p className="warning">This username is already taken.</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {doubleEmail && (
          <p className="warning">
            There&#39;s already an account registered with this email.
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Choose a password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          type="file"
          name="pfp"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        /> */}
        <button type="submit" onClick={handleSubmit}>
          Sign up!
        </button>
      </form>
    </div>
  );
};

export default SignUp;
