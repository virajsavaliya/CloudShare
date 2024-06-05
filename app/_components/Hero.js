import React from "react";
import Constant from "../_utils/Constant";
import { FaPaperPlane, FaLock, FaShieldAlt } from "react-icons/fa";
import Footer from "./Footer";

function Hero() {
  const Herosection = () => {
    return (
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-20"></div>
        </div>
        <div className="relative mx-auto max-w-screen-xl px-4 lg:px-8 py-48 lg:py-0 flex justify-center items-center h-full">
          <div className="max-w-xl text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mb-6">
              <span className="block">Upload, Save </span> and easily <span className="block">Share your files</span> in one place
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">{Constant.desc}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-yellow-500 px-12 py-3 text-sm font-medium text-gray-900 shadow-lg 
                      hover:bg-yellow-400 focus:outline-none focus:ring active:bg-yellow-600 sm:w-auto"
                href="/files"
              >
                Get Started
              </a>
              <a
                className="block w-full rounded border border-white px-12 py-3 text-sm font-medium text-white shadow-lg 
                      hover:bg-white hover:text-gray-900 focus:outline-none focus:ring active:bg-gray-200 sm:w-auto"
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
      <section id="Feature-section" className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-purple-100 rounded-full p-4 inline-flex mb-4">
                <FaPaperPlane className="text-4xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Send Files Anywhere</h3>
              <p className="text-gray-600">Easily send files to anyone, anywhere in the world with just a few clicks.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-green-100 rounded-full p-4 inline-flex mb-4">
                <FaLock className="text-4xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Protected</h3>
              <p className="text-gray-600">Ensure your files are protected with secure password options.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-red-100 rounded-full p-4 inline-flex mb-4">
                <FaShieldAlt className="text-4xl text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure and Encrypted</h3>
              <p className="text-gray-600">Your files are secure with advanced encryption techniques.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Herosection />
      <Feturesection />
      <Footer/>
    </div>
  );
}

export default Hero;
