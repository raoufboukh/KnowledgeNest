import Image from "next/image";
import React from "react";
import { linksUser } from "../constants";
import Link from "next/link";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/Slices/AuthSlice";

const LinksUser = ({ user }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="relative w-fit">
      <Image
        src={user?.image || "/assets/avatar.png"}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full cursor-pointer size-10"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`absolute right-2 top-[130%] bg-primary backdrop-blur-md p-4 rounded-lg shadow-lg transition-all duration-300 before:content-[""] before:size-0 before:border-8 before:border-b-primary before:border-transparent before:absolute before:-top-3.5 before:right-1 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {linksUser.map((link, i) =>
          !link.link ? (
            <p
              key={i}
              className="text-white hover:text-secondary transition duration-300 cursor-pointer"
              onClick={() => dispatch(logout())}
            >
              {link.title}
            </p>
          ) : (
            <Link
              key={i}
              href={link.link}
              className="text-white hover:text-secondary transition duration-300"
            >
              {link.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default LinksUser;
