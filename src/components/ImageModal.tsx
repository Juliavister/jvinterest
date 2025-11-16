import React, { useState, useEffect } from "react";
import { BoardImage } from "../types/BoardImage";
import { updateImage } from "../api/updateImage";

interface Props {
  image: BoardImage | null;
  onClose: () => void;
  onUpdate: (img: BoardImage) => void;
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

const categoryColors: Record<string, string> = {
  outfits: "bg-[#FFE5D9]",
  matcha: "bg-[#D8E2DC]",
  aesthetic: "bg-[#FFCAD4]",
  travel: "bg-[#B8D8FF]",
  food: "bg-[#FFF4B5]",
  nature: "bg-[#CDEAC0]",
  other: "bg-[#9D8189] text-white",
  uncategorized: "bg-[#E5E5E5]",
};

const ImageModal: React.FC<Props> = ({ image, onClose, onUpdate }) => {
  const [editCategory, setEditCategory] = useState("uncategorized");

  useEffect(() => {
    if (image) {
      setEditCategory(image.category ?? "uncategorized");
    }
  }, [image]);

  if (!image) return null;

  const handleSave = async () => {
    const res = await updateImage(image.id, editCategory);

    if (res.success) {
      onUpdate(res.image);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[99999] flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">

        <img src={image.url} className="w-full rounded-xl mb-5 shadow-sm" />

        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Edit Category
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const isActive = editCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                className={`
                  px-4 py-2 rounded-full text-sm transition-all 
                  border border-transparent 
                  ${categoryColors[cat]} 
                  ${
                    isActive
                      ? "ring-2 ring-[#F4ACB7] scale-105"
                      : "opacity-80 hover:opacity-100"
                  }
                `}
                onClick={() => setEditCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-[#F4ACB7] hover:bg-[#FFCAD4] text-white rounded-lg shadow transition-all"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImageModal;
