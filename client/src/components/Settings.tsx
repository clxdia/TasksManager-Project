import React, { useState } from "react";
import getUserCookie from "@/hooks/getUserCookie";
import Cookies from "universal-cookie";
import User from "@/interfaces/User";
import axios from "axios";
import Image from "next/image";
import friend1 from "../assets/random/friend1.png";
import iconDefault from "../assets/random/user.png";
import DeleteUser from "@/tools/DeleteUser";

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
        data,
        {
          withCredentials: true,
        }
      );
      const cloudinaryUrl = res.data.secure_url;
      setPicture(cloudinaryUrl);

      const updatedUserWithImage = { ...updatedUser, icon: cloudinaryUrl };
      await editUser(updatedUserWithImage);
    } catch (err) {
      console.log("error uploading icon", err);
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
      console.log("error updating icon: ", err);
    }
  };

  const editUser = async (updatedUser: User) => {
    const token = cookies.get("token");

    try {
      await axios.patch(
        process.env.MONGODB_URL + `/users/${user?._id}`,
        updatedUser,
        {
          // .patch(`http://localhost:3005` + `/users/${user?._id}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        process.env.MONGODB_URL + `/users/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserFromServer = response.data;
      document.cookie = `user=${JSON.stringify(updatedUserFromServer)}; path=/`;
      console.log("Updated User:", updatedUserFromServer);
    } catch (err) {
      console.log("error updating user: ", err);
    }
  };

  return (
    <div className="settings">
      <aside className="menu">
        <div>
          <h1>TaskFlow</h1>
        </div>
        <div className="settings__links">
          <h3>Home</h3>
          <h3>Add New Task</h3>
          <h3>Profile</h3>
        </div>
        <div>
          <h3>Log out</h3>
        </div>
      </aside>
      <main>
        <div className="header__welcome card ">
          <div>
            {user ? <h1>Hello, {user.name}!</h1> : <h1>Loading user...</h1>}
            <h2>Edit here your profile info</h2>
          </div>
          <Image src={friend1} width="500" height="500" alt="friend" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-settings">
            <div className="form-settings__left">
              {user.icon ? (
                <Image
                  className="icon-settings"
                  src={user.icon}
                  width="400"
                  height="400"
                  alt="icon"
                />
              ) : (
                <Image
                  className="icon-settings"
                  src={iconDefault}
                  width="400"
                  height="400"
                  alt="iconDefault"
                />
              )}
              <div className="rainbow__button">
                <label htmlFor="icon">Edit profile picture</label>
                <input
                  type="file"
                  name="icon"
                  className="input-settings"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="form-settings__right">
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
                <button
                  className="buttons__addtask rainbow__button"
                  type="submit"
                >
                  Save changes
                </button>
                <hr></hr>
                <DeleteUser />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
