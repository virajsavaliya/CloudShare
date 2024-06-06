import React, { useState, useRef } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';
import { motion } from 'framer-motion';

function UploadForm({ uploadBtnClick, isUploading, progress }) {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const allowedFileTypes = [
    'image/svg+xml', 
    'image/png', 
    'image/jpeg', 
    'image/gif', 
    'application/pdf', 
    'application/zip', 
    'application/x-rar-compressed', 
    'application/x-7z-compressed', 
    'application/x-tar', 
    'application/x-gzip', 
    'application/x-zip-compressed', 
    // MS Office documents
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'application/vnd.ms-excel', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    'application/vnd.ms-powerpoint', 
    'application/msaccess', 
    'application/vnd.ms-project', 
    'application/vnd.visio' 
  ];

  const onFileSelect = (file) => {
    if (file && !allowedFileTypes.includes(file.type)) {
      setErrorMsg("Unsupported file format. Please upload SVG, PNG, JPG, GIF, ZIP or PDF files.");
      return;
    }
    if (file && file.size > 2621440) {
      setErrorMsg("Maximum File Upload Size is 2.5MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };
    

  const removeFile = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    onFileSelect(droppedFile);
  };

  return (
    <div 
      className={`flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-4 ${dragOver ? 'border-blue-500' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <motion.label
        htmlFor="dropzone-file"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center w-full md:w-1/2 h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-gray-100 transition duration-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <svg
            className="w-12 h-12 mb-4 text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or
            <strong className="text-primary">drag</strong> and{" "}
            <strong className="text-primary">drop</strong>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG, GIF, or PDF (Max Size: 2.5MB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(event) => onFileSelect(event.target.files[0])}
          disabled={isUploading}
        />
      </motion.label>
      <div className="w-full md:w-1/2 flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-white shadow-md h-64">
        <h2 className="text-xl font-semibold mb-1 text-center">Preview</h2>
        <hr className="border-b-2 border-gray-300 w-16 mx-auto mb-4" />
        {errorMsg && <AlertMsg msg={errorMsg} />}
        {file ? (
          <>
            <FilePreview file={file} removeFile={removeFile} />
            {!isUploading && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="p-2 bg-primary text-white w-full rounded-full mt-5"
                onClick={() => uploadBtnClick(file)}
              >
                Upload
              </motion.button>
            )}
            {isUploading && <ProgressBar progress={progress} />}
          </>
        ) : (
          <p className="text-gray-500 text-center">No file selected</p>
        )}
      </div>
    </div>
  );
}

export default UploadForm;
