import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Intro from "./Intro";
import Login from "./Login";
import SignUp from "./SignUp";

interface FormProps {
  setIsLoggedIn: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setUser: (value: boolean) => void;
}

const Form = ({ setIsLoggedIn }: FormProps) => {
  const [activeComponent, setActiveComponent] = useState<"login" | "signup">(
    "login"
  );

  const toggleComponent = () => {
    setActiveComponent(activeComponent === "login" ? "signup" : "login");
  };

  return (
    <div className="parallax">
      <section className="login" id="form">
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
              <SignUp
                toggleLogin={toggleComponent}
                toggleSignUp={function (): void {
                  throw new Error("Function not implemented.");
                }}
                toggleComponent={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ) : (
              <Login
                toggleLogin={toggleComponent}
                setIsLoggedIn={setIsLoggedIn}
              />
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

export default Form;
