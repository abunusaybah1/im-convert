"use client";
import React, { useState } from "react";

const ImageConvert = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("");

  const finishConversion = (message: string) => {
    setIsLoading(false);
    setStatusColor("#16a34a");
    setStatus(message);
    setTimeout(() => {
      setStatus("");
      setStatusColor("");
    }, 4000);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (!newImage) return;

    if (
      newImage.type.includes("image/jpeg") ||
      newImage.type.includes("image/jpg")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setImageFile(newImage);
      };
      reader.readAsDataURL(newImage);
    } else {
      setStatus("Please upload a valid JPEG image.");
      setStatusColor("#dc2626");
      e.target.value = "";
      setImageSrc(null);
      setImageFile(null);
      setTimeout(() => {
        setStatus("");
        setStatusColor("");
      }, 3000);
    }
    e.preventDefault();
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusColor("#2563eb");
    setStatus("Converting image, please wait...");

    if (!imageSrc) return;

    setTimeout(() => {
      const imageObj = new Image();
      imageObj.src = imageSrc;

      imageObj.onload = () => {
        const canvasElem = document.createElement("canvas");
        canvasElem.width = imageObj.width;
        canvasElem.height = imageObj.height;

        const canvasContext = canvasElem.getContext("2d");
        if (!canvasContext) return;

        canvasContext.drawImage(imageObj, 0, 0);
        const dataUrl = canvasElem.toDataURL("image/png");

        const imageDownloadLink = document.createElement("a");
        imageDownloadLink.href = dataUrl;
        imageDownloadLink.download = "im-convert-image.png";
        imageDownloadLink.click();

        finishConversion("Done! Your image has been converted and downloaded.");
      };
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 bg-linear-to-br from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Im-Convert</h2>

      <p className="text-lg text-gray-700">
        Convert your Jpeg image to PNG format
      </p>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Image Upload</h2>
        <p className="text-gray-600 text-center">Upload your Jpeg image here</p>

        <section className="mt-10">
          <form
            onSubmit={handleConvert}
            className="flex flex-col gap-6 justify-center items-center"
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
                  Image size:{" "}
                  {imageFile?.size ? (imageFile.size / 1024).toFixed(2) : 0} KB
                </p>
                <img
                  src={imageSrc}
                  alt="Preview"
                  style={{ maxWidth: "300px" }}
                  className="rounded shadow mb-4"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    !isLoading
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-500 cursor-not-allowed"
                  } px-6 py-2 text-white rounded transition-colors duration-200`}
                >
                  {isLoading ? "Converting..." : "Convert to PNG"}
                </button>
              </div>
            )}
            {status && (
              <p
                style={{ color: statusColor }}
                className="mt-4 align-self-cente m-auto"
              >
                {status}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ImageConvert;
