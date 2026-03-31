"use client";
// import { NewImage } from "@/types/index";
import React, { useState } from "react";
// import Image from "next/image";

const ImageConvert = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newSize, setNewSize] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("");

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (!newImage) return;

    // if (
    //   newImage.type.includes("image/jpeg") ||
    //   newImage.type.includes("image/jpg")
    // ) {
    const reader = new FileReader(); //The FileReader interface lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setImageFile(newImage);
      return imageFile;
    };

    reader.readAsDataURL(newImage); //The readAsDataURL() method of the FileReader interface is used to read the contents of the specified file's data as a base64 encoded string.
    // } else {
    //   setStatus("Please upload a jpeg image");
    //   setStatusColor("#dc2626");

    //   setTimeout(() => {
    //     setStatus("");
    //     setStatusColor("");
    //   }, 3000);

    //   e.target.value = "";
    //   setImageSrc(null);
    // }
    e.preventDefault();
  };

  const handleCompress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusColor("#2563eb");
    setStatus("Compressing image, please wait...");

    setTimeout(() => {
      setStatus("");
      setStatusColor("");
    }, 3000);

    if (!imageSrc) return;

    setTimeout(() => {
      const imageObj = new Image();

      imageObj.onload = () => {
        const width = imageObj.width;
        const height = imageObj.height;
        const canvasElem = document.createElement("canvas");

        const pixelBytes = width * height * 4;
        const scale = Math.sqrt((Number(newSize) * 1024) / pixelBytes); //

        canvasElem.width = Math.floor(width * scale); // Gets the width and heigth of the image to be used as the canvas dimensions
        canvasElem.height = Math.floor(height * scale);

        const canvasContext = canvasElem.getContext("2d");
        if (!canvasContext) return;

        canvasContext.drawImage(
          imageObj,
          0,
          0,
          canvasElem.width,
          canvasElem.height,
        );
        const dataUrl = canvasElem.toDataURL("image/png"); //The HTMLCanvasElement.toDataURL() method returns a data URL containing a representation of the image in the format specified by the type parameter.

        const imageDownloadLink = document.createElement("a");
        imageDownloadLink.href = dataUrl;
        imageDownloadLink.download = "im-convert-image.png";
        imageDownloadLink.click();
        setIsLoading(false);
        setStatusColor("#16a34a");
        setStatus("Image compressed successfully and downloaded!");
        setTimeout(() => {
          setStatus("");
          setStatusColor("");
        }, 3000);
        setNewSize("");
      };

      imageObj.src = imageSrc;
    }, 2000);
  };

  return (
    <>
      <p className="text-lg text-gray-700">
        Compress your Jpeg image to PNG format
      </p>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Image Upload</h2>
        <p className="text-gray-600 text-center">
          Upload your Jpeg image to be compressed here
        </p>

        <section className="mt-10">
          <form
            action=""
            onSubmit={handleCompress}
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
                <p>
                  Image size:
                  {imageFile?.size ? (imageFile.size / 1024).toFixed(2) : 0} KB
                </p>
                <img
                  src={imageSrc}
                  alt="Preview"
                  style={{ maxWidth: "300px" }}
                  className="rounded shadow mb-4"
                />
                Preferred size in KB{" "}
                <input
                  type="number"
                  className="border-red-600 "
                  placeholder="Enter preferred size in KB"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newSize}
                  className={`${newSize ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 disabled cursor-not-allowed"} px-6 py-2 text-white rounded transition-colors duration-200`}
                >
                  {isLoading ? "Compressing..." : "Compress image"}
                </button>
              </div>
            )}
            {status && (
              <p style={{ color: statusColor }} className="mt-4">
                {status}
              </p>
            )}
          </form>
        </section>
      </div>
    </>
  );
};

export default ImageConvert;
