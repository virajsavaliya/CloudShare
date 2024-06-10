import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
          <Image src="/logo.webp"
          alt="logo"
           width={150} height={300} />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm"></ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  href="/files"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
