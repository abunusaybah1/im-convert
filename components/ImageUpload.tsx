"use client";
// import { NewImage } from "@/types/index";
import React, { useState } from "react";
// import Image from "next/image";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (!newImage) return;

    if (
      newImage.type.includes("image/jpeg") ||
      newImage.type.includes("image/jpg")
    ) {
      //   setTimeout(() => {
      const reader = new FileReader(); //The FileReader interface lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(newImage); //The readAsDataURL() method of the FileReader interface is used to read the contents of the specified file's data as a base64 encoded string.
      //   }, 2000);
    } else {
      alert("Please upload a jpeg image");
      e.target.value = "";
      setImageSrc(null);
    }
    e.preventDefault();
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    if (!imageSrc) return;

    setTimeout(() => {
      const imageObj = new Image();
      imageObj.src = imageSrc;

      imageObj.onload = () => {
        const canvasElem = document.createElement("canvas");
        canvasElem.width = imageObj.width; // Gets the width and heigth of the image to be used as the canvas dimensions
        canvasElem.height = imageObj.height;

        const canvasContext = canvasElem.getContext("2d");
        if (!canvasContext) return;

        canvasContext.drawImage(imageObj, 0, 0);
        const dataUrl = canvasElem.toDataURL("image/png"); //The HTMLCanvasElement.toDataURL() method returns a data URL containing a representation of the image in the format specified by the type parameter.

        const imageDownloadLink = document.createElement("a");
        imageDownloadLink.href = dataUrl;
        imageDownloadLink.download = "im-convert-image.png";
        imageDownloadLink.click();
      };
    }, 2000);

    alert(
      "Your image is being converted and will download automatically, please wait...",
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Image Upload</h2>
      <p className="text-gray-600 text-center">Upload your Jpeg image here</p>

      <section className="mt-10">
        <form
          action=""
          onSubmit={handleConvert}
          className="flex flex-col gap-6"
        >
          <input
            type="file"
            accept="image/*"
            id="upload"
            onChange={handleUploadImage}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imageSrc && (
            <div className="flex flex-col items-center mt-6">
              <h3 className="text-xl font-semibold mb-2">Preview</h3>
              <p className="text-gray-500 mb-4">
                Image preview will be shown here
              </p>
              <img
                src={imageSrc}
                alt="Preview"
                style={{ maxWidth: "300px" }}
                className="rounded shadow mb-4"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                {isLoading ? "Converting" : "Convert to PNG"}
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default ImageUpload;
