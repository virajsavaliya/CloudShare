"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { app } from '../../../firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import FileItem from './_components/FileItem';

function Fileview({ params }) {
    const db = getFirestore(app);
    const [file, setFile] = useState();

    const getFileInfo = useCallback(async () => {
        if (params.fileId) {
            try {
                const docRef = doc(db, 'uploadedFile', params.fileId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    setFile(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        }
    }, [db, params.fileId]);

    useEffect(() => {
        getFileInfo();
    }, [getFileInfo]);

    return (
        <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
            <FileItem file={file} />
        </div>
    );
}

export default Fileview;
