import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function FileInfo({ file }) {
  
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (file) {
      const type = file.fileType.split('/')[0];
      setFileType(type); // Set the fileType state variable
    }
  }, [file]);

  return file && (
    <div className='text-center border flex justify-center m-5 flex-col items-center p-4 rounded-md border-gray-300'>
      <Image
        src={fileType === 'image' ? file.fileUrl : '/file.png'}
        width={300}
        height={300}
        alt={file.fileName}
        className='h-[200px] rounded-md object-contain'
      />
      <div className='mt-2 text-left overflow-hidden w-32 md:w-48'>
        <h2 className='overflow-hidden text-ellipsis whitespace-nowrap'>{file.fileName}</h2>
        <h2 className='text-gray-400 text-[13px]'>{file.fileType}</h2>
        <h2 className='text-gray-400 text-[13px]'>{(file.fileSize / (1024 * 1024)).toFixed(2)} MB</h2>
      </div>
    </div>
  );
}

export default FileInfo;
