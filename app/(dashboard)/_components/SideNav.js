"use client"
import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Home',
            icon: Home,
            path: '/'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/files'
        },
        {
            id: 3,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        }
    ]

    const [activeIndex, setActiveIndex] = useState(-1);
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        // Find the index of the current path in the menuList
        const currentIndex = menuList.findIndex(item => item.path === window.location.pathname);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        }
    }, [router.pathname]);

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        router.push(path);
    };

    return (
        <div className='shadow-sm border-r h-full flex flex-col justify-between'>
            <div>
                <div className='pl-11 py-2 border-b'>
                    <Image className='' src='/logo.png' width={150} height={200} alt="Logo" />
                </div>
                <div className='flex flex-col float-left w-full'>
                    {menuList.map((item, index) => (
                        <button key={item.id} className={`flex gap-2 p-4 px-6 hover:bg-gray-100 text-gray-500 w-full ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
                            onClick={() => handleNavigation(index, item.path)}
                        >
                            <item.icon />
                            <h2>{item.name}</h2>
                        </button>
                    ))}
                </div>
            </div>
            <div className='p-4 border-t'>
                {user && (
                    <div className='flex items-center gap-2'>
                        <UserButton />
                        <span>{user.firstName} {user.lastName}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideNav;
