import React, { use, useState } from "react";
import getUserCookie from "@/hooks/getUserCookie";
import Cookies from "universal-cookie";
import User from "@/interfaces/User";
import axios from "axios";
import Menu from "@/components/Menu";
import Image from "next/image";

// interface EditUserProps {
//   user: User;
// }

const user = getUserCookie();

// const Settings = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState<User>(user);
//   const cookies = new Cookies();

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = cookies.get("token");
//     axios
//       // .patch(process.env.MONGODB_URL + `/tasks/${task?._id}`, updatedTask, {
//       .patch(`http://localhost:3005` + `/users/${user?._id}`, updatedUser, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log("user updated successfully");
//         setIsEditing(false);
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log("error updating user: ", error);
//       });
//   };
  return (
    <div>
      <Menu />
      <form onSubmit={handleSubmit}>
        {user.icon ? (
          <Image src={user.icon} width="30" height="30" alt="icon" />
        ) : (
          <p>no icon</p>
        )}
        <input type="file">Upload picture</input>
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
          value={updatedUser.password}
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
