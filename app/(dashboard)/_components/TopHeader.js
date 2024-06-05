"use client"
import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { MdHome, MdFolder, MdCloudUpload, MdShield } from "react-icons/md";

function TopHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 bg-white z-50 shadow">
      <div className="relative md:hidden">
        <div className="flex px-4 py-1 border-b items-center justify-between">
          <button onClick={toggleMenu}>
            <AlignJustify />
          </button>
          <Image src="/logo.png" width={150} height={100} alt="Logo" />
          <UserButton />
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md">
            <nav className="flex flex-col p-5">
              <Link
                href="/"
                onClick={closeMenu}
                className="py-2 border-b flex items-center"
              >
                <MdHome className="mr-2" /> Home
              </Link>
              <Link
                href="/files"
                onClick={closeMenu}
                className="py-2 border-b flex items-center"
              >
                <MdFolder className="mr-2" /> Files
              </Link>
              <Link
                href="/upload"
                onClick={closeMenu}
                className="py-2 border-b flex items-center"
              >
                <MdCloudUpload className="mr-2" /> Upload
              </Link>
              <Link
                href="/upgrade"
                onClick={closeMenu}
                className="py-2 border-b flex items-center"
              >
                <MdShield className="mr-2" /> Upgrade
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopHeader;
