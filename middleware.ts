import { clerkMiddleware } from "@clerk/nextjs/server";

export const config = {
  runtime: 'experimental-edge', // Ensure this is correctly set
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default clerkMiddleware();



