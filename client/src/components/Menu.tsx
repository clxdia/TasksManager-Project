"use client";

import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { SiTask } from "react-icons/si";
import Image from "next/image";
import AddTask from "../tools/AddTask";
import { GrFormClose } from "react-icons/gr";
import Cookies from "universal-cookie";

function Menu() {
  const cookies = new Cookies();
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("user");
    window.location.reload();
  };

  return (
    <>
      <div className="menu__wrapper">
        <div className="menu">
          <div>
            <Image
              width="45"
              className="pfp"
              alt="profile picture"
              src="/pfp.jpg"
              height="45"
            />
          </div>
          <div>
            <IoMdAddCircle size={40} onClick={handleModal} />
          </div>
          <div>
            <SiTask size={40} />
          </div>
          <div>
            <BiLogOutCircle size={45} onClick={handleLogout} />
          </div>
        </div>
        {modal ? (
          <div className="menu__modal">
            <div className="menu__modal__ui">
              <div className="closebutton">
                <GrFormClose size={20} onClick={handleModal} />
              </div>
              <h2>Add task</h2>
              <h3>Add a new task here!</h3>
              <AddTask />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Menu;
