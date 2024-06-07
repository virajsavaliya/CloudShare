"use client"
import React, { useState } from "react";


function Upgrade() {
  const [showPopup, setShowPopup] = useState(false);


  const NavLocation = () => {
    return (
      <div className="md:block">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <a href="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Home </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <a href="/upload" className="block transition hover:text-gray-700">
                Upload
              </a>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <a href="#" className="block transition hover:text-gray-700">
                Upgrade
              </a>
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  const handleSelectClick = () => {
    setShowPopup(true);
  };

  const UpgradeTitle = () => {
    return (
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upgrade</h1>
        <hr className="border-b-2 border-gray-300 w-16 mx-auto" />
      </div>
    );
  };

  return (
    <div className="p-5 px-4 sm:px-6 md:px-8">
      <NavLocation />
      <UpgradeTitle />

      <div className="max-w-screen-xl mx-auto py-8 sm:py-12 lg:py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <div className="divide-y divide-gray-200 rounded-2xl border border-blue-900 shadow-sm">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Free
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 text-gray-700">For casual file-senders.</p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Free
                </strong>
              </p>
              <a
                className="mt-4 block rounded border border-gray-600 bg-gray-600 px-12 py-3 text-center text-sm font-medium text-white focus:outline-none sm:mt-6"
                href="#"
              >
                Selected
              </a>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">
                What's included:
              </p>
              <ul className="mt-2 space-y-2 sm:mt-4">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">Send up to 2.5 MB</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">No need to verify transfers</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">7 Days data storage</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Pro
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 text-gray-700">For professionals and teams</p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  500 ₹
                </strong>
                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
              <a
                className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                onClick={handleSelectClick}
              >
                Select
              </a>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">
                What's included:
              </p>
              <ul className="mt-2 space-y-2 sm:mt-4">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">Send and receive up to 2 GB</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">10GB of storage</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">Decide when transfers expire</span>
                </li>
              </ul>
            </div>
          </div>
        

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Premium
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-2 text-gray-700">Share work with no limits</p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  1500 ₹
                </strong>
                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
              <a
                className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                onClick={handleSelectClick}
              >
                Select
              </a>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">
                What's included:
              </p>
              <ul className="mt-2 space-y-2 sm:mt-4">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">No Size limit on transfers</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">Unlimited storage*</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">Unlimited portals and reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>



        {/* Popup */}
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              Sorry for the inconvenience!
            </p>
            <p className="text-gray-600 mt-2">
              This service is currently unavailable.
            </p>
            <button
              className="mt-4 block rounded border border-gray-600 bg-gray-600 px-12 py-3 text-center text-sm font-medium text-white focus:outline-none sm:mt-6"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Upgrade;
