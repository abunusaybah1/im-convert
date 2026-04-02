import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 bg-blue-800 text-white p-4 flex justify-between items-center sm:px-8 md:px-10 lg:px-20">
      <Link href="/" className="font-bold">
        Im-Convert
      </Link>
      <div className="flex justify-center items-center gap-3 text-[13px] ">
        <Link
          href="/image-convert"
          className="rounded-sm bg-white text-blue-800 px-2 py-1 hover:scale-105 transition-transform duration-200"
        >
          Convert Image
        </Link>
        <Link
          href="/image-compress"
          className="rounded-sm bg-white text-blue-800 px-2 py-1 hover:scale-105 transition-transform duration-200"
        >
          Compress Image
        </Link>
      </div>
    </nav>
  );
};

export default Header;
