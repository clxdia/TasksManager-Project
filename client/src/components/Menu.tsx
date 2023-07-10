"use client";

import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { SiTask } from "react-icons/si";
import Image from "next/image";
import AddTask from "../tools/AddTask";
import { GrFormClose } from "react-icons/gr";
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { HiCheckCircle, HiHome, HiUser } from "react-icons/hi";

function Menu() {
  const cookies = new Cookies();
  const [modal, setModal] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleModal = () => {
    setModal(!modal);
  };

  const openSettings = () => {
    router.push("/settings");
    setSettings(true);
  };

  const closeSettings = () => {
    router.back();
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
            {settings ? (
              <HiCheckCircle size={40} onClick={closeSettings} />
            ) : (
              <Image
                width="45"
                className="pfp"
                alt="profile picture"
                src="/pfp.jpg"
                height="45"
                onClick={openSettings}
              />
            )}
          </div>
          <div>
            <HiHome size={30} />
            <IoMdAddCircle size={30} onClick={handleModal} />
            <HiUser size={30} />
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
