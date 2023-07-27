import React, { useEffect, useState } from "react";
import getUserCookie from "@/hooks/getUserCookie";
import Cookies from "universal-cookie";
import User from "@/interfaces/User";
import axios from "axios";
import Image from "next/image";
import friend1 from "../assets/random/friend1.png";
import iconDefault from "../assets/random/user.png";
import DeleteUser from "@/tools/DeleteUser";

const Settings = () => {
  const [file, setFile] = useState<any | null>(null);
  const [picture, setPicture] = useState<any | null>(null);

  const cookies = new Cookies();
  const user = getUserCookie();
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const [pendingFile, setPendingFile] = useState<any>(null);

  useEffect(() => {
    if (file) {
      setPendingFile(URL.createObjectURL(file));
    }
  }, [file]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const upload_preset = "jmjnmfi9";
  const cloud_name = "duhjwpbzr";

  const submitImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("failed to upload icon");
      }

      const resData = await res.json();
      const cloudinaryUrl = resData.secure_url;
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
      if (file) {
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
      <div className="settings__main">
        <header className="header__welcome card ">
          <div>
            {user ? <h1>Hello, {user.name}!</h1> : <h1>Loading user...</h1>}
            <h2>Edit here your profile info</h2>
          </div>
          <Image src={friend1} width="500" height="500" alt="friend" />
        </header>
        <section className="form-container">
          <form onSubmit={handleSubmit} className="form-settings">
            <div className="form-settings__left">
              <div>
                {pendingFile ? (
                  <Image
                    className="icon-settings"
                    src={pendingFile}
                    width="400"
                    height="400"
                    alt="icon"
                  />
                ) : (
                  <Image
                    className="icon-settings"
                    src={user?.icon || iconDefault}
                    width="400"
                    height="400"
                    alt="iconDefault"
                  />
                )}
              </div>

              <div className="rainbow__button">
                <label htmlFor="icon">Edit profile picture</label>
                <input
                  type="file"
                  name="icon"
                  className="input-settings"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
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

                <DeleteUser />
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Settings;
