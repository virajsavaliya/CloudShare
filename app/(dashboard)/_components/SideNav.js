import { File, Home, Shield, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

function SideNav() {
  const menuList = useMemo(() => [
    {
      id: 1,
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
    {
      id: 5,
      name: "Recycle Bin",
      icon: Trash2,
      path: "/recycle",
    },
  ], []);

  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Find the index of the current path in the menuList
    const currentIndex = menuList.findIndex(
      (item) => item.path === window.location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [router.pathname, menuList]);

  const handleNavigation = (index, path) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <div className="shadow-sm border-r h-full flex flex-col justify-between rounded-lg">
      <div>
        <div className="pl-11 py-2 border-b">
          <Image
            src="/logo.png"
            width={150}
            height={200}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col float-left w-full">
          {menuList.map((item, index) => (
            <button
              key={item.id}
              className={`flex gap-3 items-center p-4 px-6 transition-all duration-300 ease-in-out hover:bg-gray-200 text-gray-700 rounded-lg ${
                activeIndex === index ? "bg-blue-100 text-primary" : ""
              }`}
              onClick={() => handleNavigation(index, item.path)}
            >
              <div
                className={`border border-transparent ${
                  activeIndex === index ? "border-blue-500" : ""
                } rounded-full p-1`}
              >
                <item.icon className="menu-icon" />
              </div>
              <h2 className="font-medium">{item.name}</h2>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        {user && (
          <div className="flex items-center gap-3">
            <UserButton />
            <span className="text-gray-700 font-medium">
              {user.firstName} {user.lastName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
