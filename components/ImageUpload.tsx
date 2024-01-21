"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { ImagePlus, X } from "lucide-react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  isOpen: boolean;
  onClose: () => void;
}

const uploadPreset = "eqxzr2mi";

const ImageUpload = ({
  onChange,
  value,
  isOpen,
  onClose,
}: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  if (!isOpen) return null;

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        return (
          <div
            className="z-[99999] my-4 mx-auto p-4 w-1/2 md:w-1/4 max-w-md bg-white rounded-lg border border-gray-200 shadow-md top-[25vh] md:left-[50%] left-[30%] fixed h-[200px]"
            onClick={(e) => e.stopPropagation()}>
            <div
              onClick={() => open()}
              className="mx-auto w-4/5 h-full flex flex-col items-center justify-center gap-4 transition border-2 border-dashed cursor-pointer z-20 hover:opacity-70 border-neutral-300 text-neutral-600">
              <ImagePlus size={50} />
              Click to Upload
            </div>

            <X
              className="absolute -right-3 -top-3"
              onClick={() => onClose()}
              size={30}
            />

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                  alt="Cover Image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
