import React, { useState } from 'react'
import { Download } from 'lucide-react'
import Image from 'next/image'

function FileItem({ file }) {
    const [password, setPassword] = useState('');

    return file && (
        <div className='p-5 md:p-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center'>
            <div className='w-full max-w-sm bg-white p-6 rounded-lg shadow-md'>
                <div className='bg-blue-500 text-white p-4 rounded-t-lg text-center'>
                    <h1 className='text-xl md:text-2xl font-bold'>File Download</h1>
                    <p className='text-xs md:text-sm mt-2'>Securely download your file</p>
                </div>
                <div className='text-center flex flex-col gap-3 items-center mt-4'>
                    <h2 className='text-md md:text-lg text-gray-600'>
                        <strong className='text-blue-500'>{file.userName}</strong> shared a file with you
                    </h2>
                    <h2 className='text-xs md:text-sm text-gray-400'>Find the file details below</h2>

                    <div className='flex justify-center items-center mt-4'>
                        <div className='relative w-[120px] h-[120px]'>
                            <Image
                                src='/download-file.webp'
                                alt='Download File'
                                layout='fill'
                                objectFit='contain'
                            />
                        </div>
                    </div>

                    <h2 className='text-gray-500 text-xs md:text-sm mt-2'>
                        {file.fileName} ⚡ {file.fileType} ⚡ {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </h2>

                    <input
                        type='password'
                        className='p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400 w-full'
                        placeholder='Enter password to access'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='flex gap-2 p-2 bg-blue-500 text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300'
                        onClick={() => window.open(file.fileUrl)}
                        disabled={file.password !== password}
                    >
                        <Download className='h-4 w-4' />Download
                    </button>
                    <h2 className='text-gray-400 pt-2 text-[12px]'>*Terms and Conditions apply</h2>
                </div>
            </div>
        </div>
    )
}

export default FileItem
