"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const toggleActive = () => {
    setActive(!active);
  };

  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };


  return (
    <div
      className={`navbar flex flex-col justify-center items-center ${
        active || pathname !== "/" ? "bg-white" : "bg-slate-200"
      } transition-all duration-500 ease sticky top-0`}
    >
      <div className="container flex justify-between py-3 w-[1400px] ">
        <div className="logo text-[25px] font-bold">
          <Link href="/">
            <span className="">NepWork</span>
            <span className="text-green-400"> | Beta</span>
          </Link>
        </div>
        <div className="link flex gap-6 items-center ">
          <span className="font-bold">Business</span>
          <span className="font-bold">Explore</span>
          <span className="font-bold">Something</span>
          <span className="btn font-bold">Sign in</span>
          {!currentUser?.isSeller && (
            <span className="font-bold">Become a seller</span>
          )}
          {!currentUser && (
            <button className="btn border-[1px] border-black px-5 py-3 rounded-md hover:bg-white">
              Join
            </button>
          )}
          {currentUser && (
            <div
              className="user relative flex items-center gap-5 cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Image
                className="w-[50px] h-[50px] rounded-full object-cover"
                src="/images/abc.jpg"
                alt=""
                width={50}
                height={50}
              />

              <span>{currentUser?.username} </span>
              {open && (
                <div className="options flex flex-col gap-2 absolute top-14 right-0 p-5 bg-white border border-gray-300 rounded-[10px] text-gray-700 w-40 font-normal">
                  {currentUser?.isSeller && (
                    <>
                      <Link href="/myGigs">Gig</Link>
                      <Link href="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link href="/orders">Orders</Link>
                  <Link href="/messages">Messages </Link>
                  <Link href="/">Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <div className="w-full h-0 border-[0.5px] border-white"></div>
          <div className="w-[1280px] px-2 py-0 flex justify-between font-medium ">
            <span>test1</span>
            <span>test2</span>
            <span>test3</span>
            <span>test4</span>
            <span>test5</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
