import React from "react";
import Constant from "../_utils/Constant";
import {
  FaCloud,
  FaFile,
  FaLock,
  FaPaperPlane,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "./Footer";


function Hero() {
  const BackgroundIcons = () => {
    const icons = [FaLock, FaFile, FaCloud, FaShieldAlt];
    const colors = [
      "text-blue-500",
      "text-green-500",
      "text-yellow-500",
      "text-purple-500",
    ];
    return (
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, index) => {
          const Icon = icons[index % icons.length];
          const color = colors[index % colors.length];
          const size = Math.floor(Math.random() * 40) + 10;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          return (
            <Icon
              key={index}
              className={`absolute ${color} opacity-30`}
              style={{
                fontSize: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                zIndex: -1, // Set z-index to move icons behind content
              }}
            />
          );
        })}
      </div>
    );
  };

  const Herosection = () => {
    return (
      <section className="relative bg-gray-50 h-screen">
      <BackgroundIcons /> 
      <div className="mx-auto max-w-screen-xl px-4 py-32 pt-22 lg:flex h-full">
          <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                  <span className="text-primary">Upload, Save </span> and easily{" "}
                  <span className="text-primary">Share</span> your files in one
                  place
              </h1>
              <p className="mt-4 sm:text-xl/relaxed text-gray-500">
                  {Constant.desc}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                      className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow 
                      hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                      href="/files"
                  >
                      Get Started
                  </a>
                  <a
                      className="block w-full bg-primary rounded px-12 py-3 text-sm font-medium text-white shadow 
                      hover:bg-blue-700 focus:outline-none focus:ring active:text-blue-600 sm:w-auto"
                      href="#Feature-section"
                  >
                      Features
                  </a>
              </div>
          </div>
      </div>
  </section>
  
    );
  };

  const Feturesection = () => {
    return (
      <section
        id="Feature-section"
        className="py-8 sm:py-12 lg:py-16 bg-gray-100 "
      >
        <div>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
              Features
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <FaPaperPlane className="text-6xl text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Send Files Anywhere
                </h3>
                <p className="text-center text-gray-700">
                  Easily send files to anyone, anywhere in the world with just a
                  few clicks.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <FaLock className="text-6xl text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Password Protected
                </h3>
                <p className="text-center text-gray-700">
                  Ensure your files are protected with secure password options.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <FaShieldAlt className="text-6xl text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure and Encrypted
                </h3>
                <p className="text-center text-gray-700">
                  Your files are secure with advanced encryption techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Herosection />
      <Feturesection />
      <Footer/>
    </div>
  );
}

export default Hero;
