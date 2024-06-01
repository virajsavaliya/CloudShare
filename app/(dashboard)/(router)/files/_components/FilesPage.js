import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../firebaseConfig";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

function FilesPage() {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    try {
      const filesRef = collection(db, "uploadedFile");
      const q = query(filesRef, where("userEmail", "==", user?.primaryEmailAddress.emailAddress));
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

  const removeFile = async (fileId) => {
    try {
      // Optimistically update the state
      setFiles((files) => files.filter((file) => file.id !== fileId));
      
      // Send request to Firestore to delete the document
      await deleteDoc(doc(db, "uploadedFile", fileId));
      
      console.log("File removed successfully");
    } catch (error) {
      // If an error occurs, revert the state back to its previous value
      setFiles((prevFiles) => prevFiles);
      console.error("Error removing file:", error);
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
      <div className="hidden md:block">
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
              <Link href="/upload" className="block transition hover:text-gray-700"> Upload </Link>
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
              <a href="#" className="block transition hover:text-gray-700"> Files </a>
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

  return (
    <div className="p-5 px-8 md:px-8">
      <NavLocation />
      <FilesTitle />
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow min-w-[600px]">
          <thead>
            <tr>
              <th className="p-3 md:p-6 bg-gray-100 border-b">File ID</th>
              <th className="p-3 md:p-6 bg-gray-100 border-b">File Name</th>
              <th className="p-3 md:p-6 bg-gray-100 border-b">File Size</th>
              <th className="p-3 md:p-6 bg-gray-100 border-b">File Type</th>
              <th className="p-3 md:p-6 bg-gray-100 border-b">Short URL</th>
              <th className="p-3 md:p-6 bg-gray-100 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="p-3 md:p-6 border-b">{file.id}</td>
                  <td className="p-3 md:p-6 border-b overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{file.fileName}</td>
                  <td className="p-3 md:p-6 border-b">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                  <td className="p-3 md:p-6 border-b">{file.fileType}</td>
                  <td className="p-3 md:p-6 border-b">
                    <a href={file.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {file.shortUrl}
                    </a>
                  </td>
                  <td className="p-3 md:p-6 border-b text-center">
                    <button onClick={() => removeFile(file.id)} className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 md:p-6 border-b text-center">No files found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilesPage;
