import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";
import getUsernameFromCookie from "@/hooks/getUserCookie";

const DeleteUser = () => {
  const user = getUsernameFromCookie();
  const [ask, setAsk] = useState<boolean>(false);

  const handleDelete = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    axios
      // .delete(process.env.MONGODB_URL + `/tasks/${task?._id}`, {
      .delete(process.env.MONGODB_URL + `/users/${user?._id}`, {
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

  if (ask) {
    return (
      <div className="menu__modal">
        <div className="menu__modal__ui menu__modal__ui--ask">
          <h1>Are you sure you want to delete your account?</h1>
          <h2>This action cannot be undone.</h2>
          <div className="buttons">
            <button className="buttons__delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="buttons__cancel" onClick={() => setAsk(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className="warning delete-account" onClick={() => setAsk(true)}>
      <TiDeleteOutline size={25} /> Delete account
    </button>
  );
};

export default DeleteUser;
