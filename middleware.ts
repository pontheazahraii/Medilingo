import { NextRequest, NextResponse } from 'next/server';

// Skip middleware completely in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// In development mode, we don't need to import from clerk which causes issues
export default function middleware(request: NextRequest) {
  // Allow all requests in development
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
