import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout"

const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/dashboard" },
    { title: "User", src: "User", link: "/user" },
    { title: "Inventor", src: "Folder", link: "/Product" },
    { title: "Search", src: "Search", link: "/search" },
    { title: "Orders", src: "Chart", link: "/Customer" },
    { title: "Seller", src: "Setting", link: "/Seller" },
    { title: "Logout", src: "Chat", link: "/" },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex">
       <div
        className={`${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={require("../../assets/control.png")}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
			 border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={require("../../assets/logo.png")}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashoards
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link}>
             <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-blue-300 text-sm items-center gap-x-4 
                ${index === activeTab ? "bg-light-white" : ""}`}
              onClick={() => handleTabClick(index)}
            >
                <img src={require(`../../assets/${Menu.src}.png`)} alt="" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
            </li>
              </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
