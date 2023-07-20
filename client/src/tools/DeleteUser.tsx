import React from "react";
import Cookies from "universal-cookie";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import User from "@/interfaces/User";
import { TiDeleteOutline } from "react-icons/ti";
import getUsernameFromCookie from "@/hooks/getUserCookie";

const DeleteUser = () => {
  const user = getUsernameFromCookie();

  const handleDelete = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    alert("Are you sure you want to delete your account?");
    axios
      // .delete(process.env.MONGODB_URL + `/tasks/${task?._id}`, {
      .delete(`http://localhost:3005` + `/users/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log("user deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error deleting user: ", error);
      });
  };

  return (
    <button className="warning delete-account" onClick={handleDelete}>
      <TiDeleteOutline size={25} /> Delete account
    </button>
  );
};

export default DeleteUser;
