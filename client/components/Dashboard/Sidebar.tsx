"use client";
import React from "react";
import { dashboardLinks } from "../constants";
import {
  MdDirectionsCar,
  MdNotifications,
  MdAdd,
  MdPerson,
  MdDashboard,
  MdChevronRight,
} from "react-icons/md";
import { RiCarLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { logout } from "@/redux/Slices/AuthSlice";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  user,
}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const getIcon = (title: string) => {
    switch (title) {
      case "All Cars":
        return <MdDashboard className="text-xl" />;
      case "My Cars":
        return <MdDirectionsCar className="text-xl" />;
      case "Notifications":
        return <MdNotifications className="text-xl" />;
      case "Add Car":
        return <MdAdd className="text-xl" />;
      case "Profile":
        return <MdPerson className="text-xl" />;
      default:
        return <MdChevronRight className="text-xl" />;
    }
  };

  const getTitle = (title: string) => {
    switch (title) {
      case "All Cars":
        return user.role === "admin" ? "All Cars" : "Browse Cars";
      default:
        return title;
    }
  };

  return (
    <div className=" md:w-58 w-20 bg-white shadow-lg h-screen border-r border-gray-200  sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <Link
          href={"/"}
          className="text-xl md:text-3xl font-bold text-primary flex items-center gap-2 mb-2 justify-center md:justify-start"
        >
          <RiCarLine /> <span className="md:block hidden">Cars</span>
        </Link>
        <p className="text-sm text-gray-600 capitalize">
          {user.role} <span className="md:block hidden">Panel</span>
        </p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {dashboardLinks
            .filter((link) => link.role.includes(user.role))
            .map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveSection(link.title)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left cursor-pointer ${
                    activeSection === link.title
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {getIcon(link.title)}
                  <span className="font-medium md:block hidden">
                    {getTitle(link.title)}
                  </span>
                  {activeSection === link.title && (
                    <MdChevronRight className="ml-auto text-xl md:block hidden" />
                  )}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* User Info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 relative">
          <Image
            src={user.image || "/assets/avatar.png"}
            alt="User"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <div className="flex-1">
            <p className="text-xs text-primary capitalize font-bold md:block hidden">
              {user.name}
            </p>
          </div>
          <p
            className={`${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            } absolute bg-primary py-2 px-4 rounded-md text-white text-xs font-semibold transition-all duration-300 -top-8 transform  cursor-pointer hover:text-tertiary`}
            onClick={() => dispatch(logout())}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
