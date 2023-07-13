import axios from "axios";
import React, { FormEvent, useState } from "react";

interface SignUpProps {
  toggleLogin: () => void;
  toggleSignUp: () => void;
  toggleComponent: () => void;
}

const SignUp = ({ toggleLogin, toggleComponent }: SignUpProps) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [icon, setIcon] = useState<string>();

  const [doubleEmail, setDoubleEmail] = useState<boolean>(false);
  const [doubleUsername, setDoubleUsername] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDoubleEmail(false);
    setDoubleUsername(false);
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name) {
      setNameError("Username is required");
    } else if (!/^[^!?."]*$/.test(name)) {
      setNameError(
        "Your username contains forbidden characters like '?' or '!'."
      );
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    // .post(process.env.MONGODB_URL + "/users", { name, email, password })
    if (name && email && password) {
      axios
        .post(`http://localhost:3005/` + "users", {
          name,
          email,
          password,
          icon,
        })
        .then((result) => {
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
    }
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
          required
        />
        {nameError && <p className="warning">{nameError}</p>}
        {doubleUsername && (
          <p className="warning">This username is already taken.</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="warning">{emailError}</p>}
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
          required
        />
        {passwordError && <p className="warning">{passwordError}</p>}
        {/* <input
          type="file"
          name="pfp"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        /> */}
        <button
          type="submit"
          className="rainbow__button"
          onClick={handleSubmit}
        >
          Sign up!
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={toggleLogin}>
          <u>Sign in here!</u>
        </button>
      </p>
    </div>
  );
};

export default SignUp;
