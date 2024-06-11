import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaRegTrashAlt, FaCloudUploadAlt, FaFolder, FaQuestionCircle, FaBars, FaTimes } from "react-icons/fa"; // Added FaTimes for close icon
import { IconContext } from "react-icons";

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
            <IconContext.Provider value={{ size: "24px", className: "menu-icon" }}>
              {menuOpen ? <FaTimes /> : <FaBars />} {/* Toggle icon based on menu state */}
            </IconContext.Provider>
          </button>
          <Image src="/logo.webp" width={150} height={100} alt="Logo" />
          <UserButton />
        </div>

        <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
          <nav className="menu">
            <Link href="/" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <FaHome className="mr-2 text-lg" />
                <span className="text-lg">Home</span>
              </div>
            </Link>
            <Link href="/files" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <FaFolder className="mr-2 text-lg" />
                <span className="text-lg">Files</span>
              </div>
            </Link>
            <Link href="/upload" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <FaCloudUploadAlt className="mr-2 text-lg" />
                <span className="text-lg">Upload</span>
              </div>
            </Link>
            <Link href="/recycle" onClick={closeMenu} className="menu-item"> {/* Added Recycle link */}
              <div className="flex items-center">
                <FaRegTrashAlt className="mr-2 text-lg" />
                <span className="text-lg">Recycle</span>
              </div>
            </Link>
            <Link href="/help" onClick={closeMenu} className="menu-item">
              <div className="flex items-center">
                <FaQuestionCircle className="mr-2 text-lg" />
                <span className="text-lg">Help</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
