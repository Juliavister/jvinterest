import React, { useState } from "react";

interface UploadModalProps {
  files: File[];
  onCancel: () => void;
  onConfirm: (category: string) => void;
}

const categories = [
  "outfits",
  "matcha",
  "aesthetic",
  "travel",
  "food",
  "nature",
  "other",
  "uncategorized",
];

// Category colors (same as EditModal)
const categoryColors: Record<string, string> = {
  outfits: "#F4ACB7",
  matcha: "#B0D39B",
  aesthetic: "#FFC9D6",
  travel: "#9AB3F5",
  food: "#FFBD80",
  nature: "#A3D6A7",
  other: "#9D8189",
  uncategorized: "#D8E2DC",
};

const UploadModal: React.FC<UploadModalProps> = ({
  files,
  onCancel,
  onConfirm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("uncategorized");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
        
        <h2 className="text-xl font-bold text-[#9D8189] mb-4">
          Upload {files.length} image{files.length > 1 ? "s" : ""}
        </h2>

        <p className="text-sm text-gray-600 mb-2">Choose a category:</p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isActive ? categoryColors[cat] : "#FFE5D9",
                  color: isActive ? "#FFFFFF" : "#9D8189",
                  borderColor: "#D8E2DC",
                }}
                className="px-4 py-1 rounded-full border text-sm transition-colors"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-2 rounded-lg border"
            style={{
              backgroundColor: "#FFE5D9",
              color: "#9D8189",
              borderColor: "#D8E2DC",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="flex-1 py-2 rounded-lg font-semibold"
            style={{
              backgroundColor: categoryColors[selectedCategory],
              color: "#FFFFFF",
            }}
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
