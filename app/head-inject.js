"use client";

import Script from "next/script";
import { useEffect } from "react";

export function HeadInject() {
  useEffect(() => {
    // Add script to intercept Clerk loads
    const originalAppendChild = document.head.appendChild.bind(document.head);
    document.head.appendChild = function(child) {
      if (child.tagName === 'SCRIPT' && 
          child.src && 
          (child.src.includes('clerk.browser.js') || child.src.includes('@clerk/clerk-js')) &&
          !child.src.includes('/clerk.browser.js') // Allow our local mock
      ) {
        console.log('Intercepted Clerk script load, using local mock instead');
        const mockScript = document.createElement('script');
        mockScript.src = '/clerk.browser.js';
        return originalAppendChild(mockScript);
      }
      return originalAppendChild(child);
    };

    return () => {
      document.head.appendChild = originalAppendChild;
    };
  }, []);

  return <Script src="/clerk.browser.js" strategy="beforeInteractive" />;
} 