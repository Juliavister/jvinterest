import React from "react";

interface Props {
  onUpload: (files: File[]) => void;
}

const UploadButton: React.FC<Props> = ({ onUpload }) => {
  return (
    <div className="w-full flex justify-center">
      <input
        type="file"
        accept="image/*"
        multiple
        id="image-upload"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            onUpload(Array.from(e.target.files));
          }
        }}
      />

      <label
        htmlFor="image-upload"
        className="
          cursor-pointer 
          px-5 py-2 
          bg-blue-500 
          text-white 
          rounded-xl 
          shadow-md 
          hover:bg-blue-600 
          transition
        "
      >
        Upload Images
      </label>
    </div>
  );
};

export default UploadButton;
