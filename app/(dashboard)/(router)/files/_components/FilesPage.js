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
import Link from "next/link";
import { ClipLoader } from "react-spinners";

function FilesPage() {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    try {
      const filesRef = collection(db, "uploadedFile");
      const q = query(
        filesRef,
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
    if (user) {
      fetchFiles();
    }
  }, [user, fetchFiles]);

  const removeFile = async (file) => {
    try {
      // Move file to recycle bin with the same ID
      await setDoc(doc(db, "recycleBin", file.id), {
        ...file,
        removedAt: new Date(),
      });

      // Remove file from uploadedFile collection
      await deleteDoc(doc(db, "uploadedFile", file.id));

      // Update state to reflect removal
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));

      console.log("File moved to recycle bin");
    } catch (error) {
      console.error("Error moving file to recycle bin:", error);
    }
  };

  const openFileInNewTab = (fileUrl) => {
    window.open(fileUrl, "_blank");
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
              <a href="#" className="block transition hover:text-gray-700">
                {" "}
                Files{" "}
              </a>
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  const FilesTitle = () => {
    return (
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Files</h1>
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
        "image/heic": ".heic",
        "image/heif": ".heif",
        "image/dng": ".dng",
        "application/pdf": ".pdf",
        "application/zip": ".zip",
        "application/x-rar-compressed": ".rar",
        "application/x-7z-compressed": ".7z",
        "application/x-tar": ".tar",
        "application/x-gzip": ".gz",
        "application/x-zip-compressed": ".zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          ".docx",
        "application/msword": ".doc",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          ".xlsx",
        "application/vnd.ms-excel": ".xls",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          ".pptx",
        "application/vnd.ms-powerpoint": ".ppt",
        "application/msaccess": ".accdb",
        "application/vnd.ms-project": ".mpp",
        "application/vnd.visio": ".vsdx",
        "video/mp4": ".mp4",
        "video/x-msvideo": ".avi",
        "video/x-ms-wmv": ".wmv",
        "video/x-matroska": ".mkv",
        "video/webm": ".webm",
        "video/quicktime": ".mov",
        "video/mpeg": ".mpeg",
        "video/ogg": ".ogv",
        "video/3gpp": ".3gp",
        "video/3gpp2": ".3g2",
        "video/x-flv": ".flv",
        "video/x-m4v": ".m4v",
        "audio/mpeg": ".mp3",
        "audio/wav": ".wav",
        "audio/ogg": ".ogg",
        "audio/flac": ".flac",
        "audio/aac": ".aac",
        "audio/mp4": ".m4a",
        "audio/amr": ".amr",
        "audio/x-ms-wma": ".wma",
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
                          onClick={() => openFileInNewTab(file.fileUrl)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => removeFile(file)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                          Recycle
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
                      onClick={() => openFileInNewTab(file.fileUrl)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => removeFile(file)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Recycle
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
      <NavLocation />
      <FilesTitle />
      <Tables />
    </div>
  );
}

export default FilesPage;
