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
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 bg-white z-50 shadow">
      <div className="relative md:hidden">
        <div className="flex px-4 py-1 border-b items-center justify-between">
          <button onClick={toggleMenu}>
            <AlignJustify size={24} /> {/* Increased icon size */}
          </button>
          <Image src="/logo.png" width={150} height={100} alt="Logo" />
          <UserButton />
        </div>

        <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
          <nav className="menu">
            <Link href="/" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <MdHome className="mr-2 text-lg" /> {/* Increased icon size */}
                <span className="text-lg">Home</span> {/* Increased text size */}
              </div>
            </Link>
            <Link href="/files" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <MdFolder className="mr-2 text-lg" /> {/* Increased icon size */}
                <span className="text-lg">Files</span> {/* Increased text size */}
              </div>
            </Link>
            <Link href="/upload" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <MdCloudUpload className="mr-2 text-lg" /> {/* Increased icon size */}
                <span className="text-lg">Upload</span> {/* Increased text size */}
              </div>
            </Link>
            <Link href="/upgrade" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <MdShield className="mr-2 text-lg" /> {/* Increased icon size */}
                <span className="text-lg">Upgrade</span> {/* Increased text size */}
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;