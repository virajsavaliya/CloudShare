import { X } from 'lucide-react'
import React from 'react'

function FilePreview({ file, removeFile }) {
  return (
    <div className='flex items-center gap-2 justify-between mt-5 w-full border rounded-md p-2 border-blue-200'>
      <div className='flex items-center p-2 gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-check">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="m9 15 2 2 4-4" />
        </svg>
        <div className='text-left overflow-hidden'>
          <h2 className='overflow-hidden text-ellipsis whitespace-nowrap w-32 md:w-48'>{file.name}</h2>
          <h2 className='text-[12px] text-gray-400'>{file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB</h2>
        </div>
      </div>
      <X className='text-red-500 cursor-pointer' onClick={() => removeFile(file)} />
    </div>
  )
}

export default FilePreview
