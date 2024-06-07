"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { generateRandomString } from "../../../_utils/GenerateRandomString";
import { app } from "../../../../firebaseConfig";

function Upload() {
  const NavLocation = () => {
    return (
      <div className="md:block">

        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <a href="/" class="block transition hover:text-gray-700">
                <span class="sr-only"> Home </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>

            <li class="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>

            <li>
              <a href="/upload" class="block transition hover:text-gray-700">
                {" "}
                Upload{" "}
              </a>
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  const UploadTitle = () => {
    return (
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">File Upload</h1>
        <hr className="border-b-2 border-gray-300 w-16 mx-auto" />
      </div>
    );
  };
  const { user } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const storage = getStorage(app);
  const db = getFirestore(app);

  const uploadFile = (file) => {
    setIsUploading(true);
    const metadata = { contentType: file.type };
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(parseFloat(progress.toFixed(2)));
        if (progress === 100) {
          setShowPopup(true); // Show the popup immediately when progress is 100%
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(100);
          setIsUploading(false);
          saveInfo(file, downloadURL);
        });
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();

    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });

    setTimeout(() => {
      setShowPopup(false); // Hide the popup after 2 seconds
      router.push("/file-preview/" + docId);
    }, 800);
  };

  return (
    <div className="p-5 px-8 md:px-8">
      <NavLocation/>
      <UploadTitle />
      <h2 className="text-[25px] text-center m-5 md:text-[40px] mb-4 mt-5">
        Start
        <strong className="text-primary"> Uploading</strong> File and{" "}
        <strong className="text-primary">Share</strong> it
      </h2>
      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        isUploading={isUploading}
        progress={progress}
      />
      {showPopup && <Popup />}
    </div>
  );
}

const Popup = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
      {/* Semi-transparent overlay */}
      <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
        <p className="text-lg font-semibold">File uploaded successfully!</p>
      </div>
    </div>
  );
};

export default Upload;
