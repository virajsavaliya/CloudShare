"use client";
import React, { useEffect, useState } from 'react';
import FileInfo from '../../file-preview/[fileId]/_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import { ClipLoader } from 'react-spinners';
import { app } from '../../../../../firebaseConfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const FilePreviewTitle = () => {
  return (
    <div className="text-center mb-8 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">File Preview</h1>
      <hr className="border-b-2 border-gray-300 w-16 mx-auto" />
    </div>
  );
};

const NavLocation = () => {
  return (
    <div className="">
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
            <a href="/upload" className="block transition hover:text-gray-700"> Upload </a>
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
            <a href="#" className="block transition hover:text-gray-700"> File-preview </a>
          </li>
        </ol>
      </nav>
    </div>
  );
};

function FilePreview({ params }) {
  const db = getFirestore(app);
  const [file, setFile] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

  const getFileInfo = async () => {
    try {
      const docRef = doc(db, 'uploadedFile', params.fileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFile(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    if (params?.fileId) {
      getFileInfo();
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [params?.fileId, getFileInfo]);

  const onPasswordSave = async (password) => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    await updateDoc(docRef, {
      password: password
    });
    console.log('Password saved:', password);
  };

  if (!file) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"blue"} loading={!file} />
      </div>
    );
  }

  return (
    <div className={`px-5 ${windowWidth <= 768 ? 'py-5' : 'py-10'}`}>
      <NavLocation />
      <FilePreviewTitle />


      <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        <FileInfo file={file} />
        <FileShareForm file={file} onPasswordSave={onPasswordSave} />
      </div>
    </div>
  );
}

export default FilePreview;
