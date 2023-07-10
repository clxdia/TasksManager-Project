"use client";
import React, { useState } from "react";
import getUserCookie from "@/hooks/getUserCookie";
import Cookies from "universal-cookie";
import User from "@/interfaces/User";
import axios from "axios";
import Menu from "@/components/Menu";
import Image from "next/image";
import Router from "next/router";

const Settings = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<any | null>(null);
  const [picture, setPicture] = useState<any | null>(null);

  const cookies = new Cookies();
  const user = getUserCookie();
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const preset_key = "vjgcmajz";
  const cloud_name = "duhjwpbzr";

  const submitImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", preset_key);
    data.append("cloud_name", cloud_name);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        data
      );
      const cloudinaryUrl = res.data.secure_url;
      setPicture(cloudinaryUrl);

      const updatedUserWithImage = { ...updatedUser, icon: cloudinaryUrl };
      await editUser(updatedUserWithImage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (image) {
        await submitImage();
      } else {
        await editUser(updatedUser);
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (updatedUser: User) => {
    const token = cookies.get("token");

    try {
      await axios
        // .patch(process.env.MONGODB_URL + `/tasks/${task?._id}`, updatedTask, {
        .patch(`http://localhost:3005` + `/users/${user?._id}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      const response = await axios.get(
        `http://localhost:3005/users/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserFromServer = response.data;
      document.cookie = `user=${JSON.stringify(response.data)}; path=/`;
      console.log("Updated User:", updatedUserFromServer);
    } catch (err) {
      console.log("error updating user: ", err);
    }
  };

  return (
    <div className="settings">
      <Menu />
      <form onSubmit={handleSubmit}>
        {user.icon ? (
          <Image src={user.icon} width="30" height="30" alt="icon" />
        ) : (
          <p>no icon</p>
        )}
        <input
          type="file"
          name="icon"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder={user.name}
          name="name"
          value={updatedUser.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder={user.email}
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Change password</label>
        <input
          type="password"
          placeholder="Choose a new password"
          name="password"
          onChange={handleInputChange}
        />
        <div className="buttons">
          <button className="buttons__addtask" type="submit">
            Save update
          </button>
          <button className="buttons__cancel" type="submit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
