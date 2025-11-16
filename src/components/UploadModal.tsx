import React, { useState } from "react";

interface UploadModalProps {
  files: File[];
  onCancel: () => void;
  onConfirm: (category: string) => void;
}

const categories = ["outfits", "matcha", "aesthetic", "travel", "other"];

const UploadModal: React.FC<UploadModalProps> = ({
  files,
  onCancel,
  onConfirm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("outfits");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-2">
          Upload {files.length} image(s)
        </h2>

        <label className="text-sm text-gray-600">Choose category:</label>

        <select
          className="w-full border px-3 py-2 rounded mt-1"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-gray-200 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded"
            onClick={() => onConfirm(selectedCategory)}   
            >
            Upload
        </button>


        </div>
      </div>
    </div>
  );
};

export default UploadModal;
