"use client";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// interface User {
//   name: string;
//   email: string;
//   password: string;
//   pfp: string;
// }

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  // const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.MONGODB_URL}/register`, { name, email, password })
  //     .then((result) => console.log(result))
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3005/register`, { name, email, password })
      .then((result) => {
        console.log(result);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <h1>Sign up</h1>
      <form className="signup__form">
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
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
      <p>OR</p>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default SignUp;
