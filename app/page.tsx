import ImageConvert from "@/components/ImageConvert";
import ImageCompress from "@/components/ImageCompress";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Im-Convert</h2>
      
      {/* <ImageConvert /> */}
      <ImageCompress />
    </div>
  );
};

export default page;
