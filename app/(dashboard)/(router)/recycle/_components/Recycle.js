"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

function Recycle() {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    try {
      const recycleBinRef = collection(db, "recycleBin");
      const q = query(
        recycleBinRef,
        where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
      );
      const querySnapshot = await getDocs(q);

      const userFiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFiles(userFiles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const recoverFile = async (file) => {
    try {
      // Move file back to uploadedFile collection
      await setDoc(doc(db, "uploadedFile", file.id), {
        ...file,
      });

      // Remove file from recycleBin collection
      await deleteDoc(doc(db, "recycleBin", file.id));

      // Update state to reflect recovery
      setFiles((files) => files.filter((f) => f.id !== file.id));

      console.log("File recovered successfully");
    } catch (error) {
      console.error("Error recovering file:", error);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      // Remove file from recycleBin collection
      await deleteDoc(doc(db, "recycleBin", fileId));

      // Update state to reflect deletion
      setFiles((files) => files.filter((file) => file.id !== fileId));

      console.log("File deleted permanently");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const NavLocation = () => {
    return (
      <div className="md:block">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <Link href="/" className="block transition hover:text-gray-700">
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
              </Link>
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
              <Link
                href="/upload"
                className="block transition hover:text-gray-700"
              >
                {" "}
                Upload{" "}
              </Link>
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
              <a href="/recycle" className="block transition hover:text-gray-700">
                {" "}
                Recycle{" "}
              </a>
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  const RecycleBinTitle = () => {
    return (
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recycle Bin</h1>
        <hr className="border-b-2 border-gray-300 w-16 mx-auto" />
      </div>
    );
  };

  const Tables = () => {
    const shortenFileType = (fileType) => {
      const fileTypeMap = {
        "image/jpeg": ".jpeg",
        "image/png": ".png",
        "image/svg+xml": ".svg",
        "image/gif": ".gif",
        "application/pdf": ".pdf",
        "application/zip": "zip",
        "application/x-rar-compressed": "zip",
        "application/x-7z-compressed": "zip",
        "application/x-tar": "zip",
        "application/x-gzip": "zip",
        "application/x-zip-compressed": "zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          ".docx",
        "application/msword": ".doc",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          ".csv",
        "application/vnd.ms-excel": ".csv",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          ".ppt",
        "application/vnd.ms-powerpoint": ".ppt",
        "application/msaccess": ".accda",
        "application/vnd.ms-project": ".mpp",
        "application/vnd.visio": ".vsdx",
      };

      return fileTypeMap[fileType] || fileType;
    };

    return (
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 md:p-6 bg-gray-100 border-b text-center">
                  No.
                </th>
                <th className="p-3 md:p-6 bg-gray-100 border-b text-center">
                  File Name
                </th>
                <th className="p-3 md:p-6 bg-gray-100 border-b text-center">
                  File Size
                </th>
                <th className="p-3 md:p-6 bg-gray-100 border-b text-center">
                  File Type
                </th>
                <th className="p-3 md:p-6 bg-gray-100 border-b text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file, index) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="p-3 md:p-6 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 md:p-6 border-b text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                      {file.fileName}
                    </td>
                    <td className="p-3 md:p-6 border-b text-center">
                      {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="p-3 md:p-6 border-b text-center">
                      {shortenFileType(file.fileType)}
                    </td>
                    <td className="p-3 md:p-6 border-b text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => recoverFile(file)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
                        >
                          Recover
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 md:p-6 border-b text-center">
                    No files found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div
                key={file.id}
                className="border border-gray-300 rounded-lg p-4 mb-4 shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    #{index + 1} {file.id}
                  </span>
                  <span className="flex space-x-2">
                    <button
                      onClick={() => recoverFile(file)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Recover
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </span>
                </div>
                <div className="mb-2">
                  <p className="font-semibold">File Name:</p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {file.fileName}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-semibold">File Size:</p>
                    <p>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div>
                    <p className="font-semibold">File Type:</p>
                    <p>{shortenFileType(file.fileType)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No files found</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 px-8 md:px-8">
      <NavLocation/>
      <RecycleBinTitle />
      <Tables />
    </div>
  );
}

export default Recycle;
