import React from "react";
import { BoardImage } from "../types/BoardImage";

interface ImageGridProps {
  images: BoardImage[];
  onSelect: (img: BoardImage) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onSelect }) => {
  return (
    <div className="px-4">
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          xl:columns-5
          gap-4
        "
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="mb-4 break-inside-avoid cursor-pointer hover:opacity-90 transition"
            onClick={() => onSelect(img)}
          >
            <img
              src={img.url}
              alt=""
              className="w-full rounded-lg shadow-sm"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
