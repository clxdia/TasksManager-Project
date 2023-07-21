"use client";

import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import AddTask from "../tools/AddTask";
import { GrFormClose } from "react-icons/gr";
import Cookies from "universal-cookie";
import { HiHome, HiOutlineMenuAlt2, HiUser } from "react-icons/hi";
import getUsernameFromCookie from "@/hooks/getUserCookie";
import { FaRegCircleUser } from "react-icons/fa6";

interface MenuProps {
  setSettings: (value: boolean) => void;
}

function Menu({ setSettings }: MenuProps) {
  const cookies = new Cookies();
  const [modal, setModal] = useState<boolean>(false);
  const user = getUsernameFromCookie();

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSettings = () => {
    setSettings(true);
  };

  const handleHomepage = () => {
    setSettings(false);
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
            {user.icon ? (
              <Image
                className="pfp"
                src={user.icon}
                width="400"
                height="400"
                alt="icon"
              />
            ) : (
              <FaRegCircleUser size={30} />
            )}
          </div>
          <div>
            <HiHome size={30} onClick={handleHomepage} />
            <IoMdAddCircle size={30} onClick={handleModal} />
            <HiUser size={30} onClick={handleSettings} />
          </div>
          <div>
            <BiLogOutCircle size={30} onClick={handleLogout} />
          </div>
        </div>
        {modal ? (
          <div className="menu__modal">
            <div className="menu__modal__ui">
              <div className="closebutton">
                <GrFormClose size={20} onClick={handleModal} />
              </div>
              <h1>Add task</h1>
              <h2>Add a new task here!</h2>
              <div className="buttons">
                <AddTask />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mobile__menu">
        <HiOutlineMenuAlt2 />
        <div className="mobile__menu__pfp">
          {user.icon ? (
            <Image
              className="pfp"
              src={user.icon}
              width="400"
              height="400"
              alt="icon"
            />
          ) : (
            <FaRegCircleUser size={30} />
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
