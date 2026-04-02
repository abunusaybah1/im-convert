import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="max-w-xl text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Image Tools for Everyday Use
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Easily convert your images to PNG or compress them to your desired
          size without losing quality. Fast, simple, and efficient.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/image-convert"
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Convert Image
        </Link>

        <Link
          href="/image-compress"
          className="bg-white text-blue-700 border border-blue-600 px-5 py-2 rounded-md shadow-sm hover:bg-blue-50 hover:scale-105 transition-all duration-200"
        >
          Compress Image
        </Link>
      </div>
    </div>
  );
};

export default page;
