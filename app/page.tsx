import ImageUpload from "@/components/ImageUpload";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Im-Convert</h2>
      <p className="text-lg text-gray-700 mb-8">Convert your Jpeg image to PNG format</p>
      <ImageUpload />
    </div>
  );
};

export default page;
