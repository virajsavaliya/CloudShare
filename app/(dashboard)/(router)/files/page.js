"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FilesPage from './_components/FilesPage';
import { ClipLoader } from "react-spinners";

function Files() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 


  useEffect(() => {
    if (isLoaded && !userId) {
      // User is not signed in, redirect to sign in page
      router.push(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`);
    }
  }, [isLoaded, userId, router, pathname]);




  return (
    
    <div>
      
      <SignedIn>
        <FilesPage />
      </SignedIn>
      <SignedOut>
        {/* Redirect to sign-in with a return URL parameter */}
        <SignInButton redirectUrl={pathname} />
      </SignedOut>
    </div>
  );
  
}


export default Files;
