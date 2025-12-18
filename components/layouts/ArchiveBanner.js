import React from "react";
import Link from "next/link";

const ArchiveBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-900 shadow-sm pt-1">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-2">
          {/* Warning Icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-4 h-4 text-amber-600 dark:text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Message */}
          <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200 text-center">
            This website has been archived and will no longer be updated. The
            latest website will be developed at{" "}
            <Link
              href="https://devvnull.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-amber-900 dark:hover:text-amber-100 transition"
            >
              devvnull.vercel.app
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchiveBanner;
