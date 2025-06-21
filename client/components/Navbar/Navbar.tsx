"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { links } from "../constants";
import { RiMenu3Fill, RiCloseFill, RiCarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { checkAuth } from "@/redux/Slices/AuthSlice";
import LinksUser from "./LinksUser";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <header className="fixed top-0 left-0 z-50 w-full  bg-black/70">
      <div className="container mx-auto py-4 lg:px-16 px-8 flex justify-between border-b border-tertiary items-center ">
        <Link href="/" className="text-3xl font-bold flex items-center gap-1">
          <RiCarLine /> <span className="sm:block hidden">Cars</span>
        </Link>
        <RiMenu3Fill
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <nav
          className={
            "flex lg:flex-row flex-col gap-6 text-lg font-semibold  lg:justify-between lg:px-0 px-4 lg:items-center lg:top-0 lg:left-0 lg:bg-transparent bg-black lg:h-fit h-screen top-0 right-0 transition-all duration-300 lg:relative absolute w-50 lg:w-[60%]" +
            (isOpen ? " translate-x-0" : " translate-x-full lg:translate-x-0")
          }
        >
          <RiCloseFill
            className="lg:hidden cursor-pointer right-5 text-2xl absolute top-4"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          <div className="flex flex-col lg:flex-row lg:py-0 pt-20 gap-4 lg:gap-20">
            {links.map(
              (link, i) =>
                link.title !== "Sign" && (
                  <Link key={i} href={link.link}>
                    {link.title}
                  </Link>
                )
            )}
          </div>
          <div>
            {!user ? (
              links.map(
                (link, i) =>
                  link.title === "Sign" && (
                    <Link
                      key={i}
                      href={link.link}
                      className="bg-primary px-4 py-2 rounded-md text-white"
                    >
                      {link.title}
                    </Link>
                  )
              )
            ) : (
              <LinksUser user={user} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
