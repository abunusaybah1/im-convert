"use client";
import React, { useState } from "react";

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

    if (!newImage.type.startsWith("image/")) {
      setStatus("Please upload a valid image file.");
      setStatusColor("#dc2626");
      setTimeout(() => {
        setStatus("");
        setStatusColor("");
      }, 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
      setImageFile(newImage);
    };
    reader.readAsDataURL(newImage);
    e.preventDefault();
  };

  const triggerDownload = (dataUrl: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "im-convert-image.png";
    a.click();
  };

  const finishCompression = (message: string) => {
    setIsLoading(false);
    setStatusColor("#16a34a");
    setStatus(message);
    setNewSize("");
    setTimeout(() => {
      setStatus("");
      setStatusColor("");
    }, 4000);
  };

  const handleCompress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusColor("#2563eb");
    setStatus("Compressing image, please wait...");

    if (!imageSrc) return;

    setTimeout(() => {
      const imageObj = new Image();

      imageObj.onload = () => {
        const targetBytes = Number(newSize) * 1024;
        const rawPixelBytes = imageObj.width * imageObj.height * 4;

        const getPngResult = (
          scale: number,
        ): { dataUrl: string; bytes: number } => {
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.floor(imageObj.width * scale));
          canvas.height = Math.max(1, Math.floor(imageObj.height * scale));

          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL("image/png");
          const bytes = Math.round(dataUrl.length * 1.2);
          return { dataUrl, bytes };
        };

        // check if full-size image already fits within target
        const fullSize = getPngResult(1.5);
        if (fullSize.bytes <= targetBytes) {
          triggerDownload(fullSize.dataUrl);
          const actualKb = (fullSize.bytes / 1024).toFixed(1);
          finishCompression(
            `Done! Image was already within target. Downloaded at ~${actualKb} KB`,
          );
          return;
        }

        // binary search for the best scale
        const initialScale = Math.min(
          1,
          Math.sqrt(targetBytes / rawPixelBytes),
        );
        let low = 0.01;
        let high = initialScale;
        let best = getPngResult(initialScale);

        for (let i = 0; i < 15; i++) {
          const mid = (low + high) / 2;
          const result = getPngResult(mid);

          if (
            Math.abs(result.bytes - targetBytes) <
            Math.abs(best.bytes - targetBytes)
          ) {
            best = result;
          }

          if (result.bytes > targetBytes) high = mid;
          else low = mid;
        }

        triggerDownload(best.dataUrl);
        const actualKb = (best.bytes / 1024).toFixed(1);
        finishCompression(`Done! Downloaded at ~${actualKb} KB`);
      };

      imageObj.src = imageSrc;
    }, 500);
  };

  return (
    <>
      <p className="text-lg text-gray-900">Compress your image to PNG format</p>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Image Upload</h2>
        <p className="text-gray-900 text-center">
          Upload your image to be compressed here
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
                <p className="text-gray-900 mb-4">
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
                Preferred size in KB{" "}
                <input
                  type="number"
                  className="border-red-600"
                  placeholder="Enter preferred size in KB"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newSize || isLoading}
                  className={`${
                    newSize && !isLoading
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-500 cursor-not-allowed"
                  } px-6 py-2 text-white rounded transition-colors duration-200`}
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
