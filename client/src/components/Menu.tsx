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
import { CgClose } from "react-icons/cg";
import add from "../assets/random/add.png";

interface MenuProps {
  setSettings: (value: boolean) => void;
}

function Menu({ setSettings }: MenuProps) {
  const cookies = new Cookies();
  const [modal, setModal] = useState<boolean>(false);
  const user = getUsernameFromCookie();
  const [menu, setMenu] = useState<boolean>(false);

  const handleModal = () => {
    setMenu(false);
    setModal(!modal);
  };

  const handleSettings = () => {
    setSettings(true);
    setMenu(false);
  };

  const goHome = () => {
    setSettings(false);
  };

  const handleHomepage = () => {
    setSettings(false);
  };

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("user");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenu(!menu);
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
        <HiOutlineMenuAlt2 size={30} onClick={toggleMenu} />
        {menu ? (
          <div className="mobile__menu--toggled">
            <div className="mobile__menu__purple">
              <CgClose
                className="mobile__menu__toggler"
                size={30}
                onClick={toggleMenu}
              />
              <div className="mobile__menu__above" onClick={handleSettings}>
                <div className="mobile__menu__content">
                  <div className="mobile__menu__pfp">
                    {user?.icon ? (
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
                  <div className="mobile__menu__text">
                    <h3>{user?.name}</h3>
                    <h4>{user?.email}</h4>
                  </div>
                </div>
              </div>
              <p onClick={handleSettings}>Edit profile info</p>
            </div>
            <div className="mobile__menu__below">
              <div
                className="mobile__menu__below__content"
                onClick={handleModal}
              >
                <IoMdAddCircle size={30} fill="white" />
                <p>Add new task</p>
              </div>
              <div className="logout" onClick={handleLogout}>
                <BiLogOutCircle size={30} />
                <p>Log out</p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="mobile__menu__pfp">
          {user.icon ? (
            <Image
              className="pfp"
              src={user.icon}
              width="400"
              height="400"
              alt="icon"
              onClick={goHome}
            />
          ) : (
            <FaRegCircleUser size={30} onClick={goHome} />
          )}
        </div>
        <div className="mobile__menu__add">
          <Image
            className="add"
            src={add}
            width="400"
            height="400"
            alt="icon"
            onClick={handleModal}
          />
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
    </>
  );
}

export default Menu;
