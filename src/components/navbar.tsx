"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

// add icons
const routes: { title: string; href: string; icon: string}[] = [
  { title: "HOME", href: "/", icon:""},
  { title: "EXPERIENCE", href: "/experience", icon:""},
  { title: "PROJECTS", href: "/projects", icon:""},
  { title: "TODO", href: "/todo", icon:""},
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div className="relative flex items-center justify-between gap-x-2">
        <div className="p-3 bg-[var(--red)] rounded-full border-3 border-black"></div>
        <div className="p-3 bg-[var(--yellow)] rounded-full border-3 border-black"></div>
        <div className="flex w-full justify-between">
        <div className="justify-end justify-items-end sm:flex hidden">
        {routes.map((route) => (
          <div key={route.href} className="">
            {/* add icon image here  */}
            <Link
              href={route.href}
              className={
                "lg:px-5 md:px-3 sm:px-1.5 text-3xl text-[var(--darker-blue)] items-center inline-flex font-[heading-font] hover:bg-[var(--light-blue)] rounded-lg transition-colors"
              }
              >
              {route.title}
            </Link>
            <span className="text-[var(--darker-blue)] text-3xl">|</span>
          </div>
        ))}
        </div>
        {/* <Image className="object-contain" src="/ieeemasterbrand.png" alt="IEEE UCF Logo" width={70} height={70} /> */}
      </div>

      

      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

      <button onClick={toggleMenu} className="sm:hidden bg-[var(--ieee-dark-yellow)] mr-5 z-50 cursor-pointer">
        {menuOpen ? (
          <XMarkIcon className="h-7 w-7 fixed bg-[var(--ieee-dark-yellow)] -translate-x-7 -translate-y-3.5 z-50" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <div className="fixed inset-0 flex flex-col z-40 bg-black h-fit max-w-screen">
      <div className="flex w-full grow flex-col gap-1 px-4 pb-2 py-12">
          <Link
            href="/"
            onClick={toggleMenu}
            className={"hover:text-[var(--ieee-bright-yellow)] font-[heading-font] text-white inline-flex h-10 w-full items-center text-sm transition-colors"}
          >
            HOME

          </Link>
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            onClick={toggleMenu}
            className={"hover:text-[var(--ieee-bright-yellow)] font-[heading-font] text-white inline-flex h-10 w-full items-center text-sm transition-colors"}
          >
            {route.title}
          </Link>
        ))}
        </div>
    </div>
  );
};

export { Navbar };
