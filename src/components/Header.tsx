import React from "react";

interface HeaderProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  onUpload: (files: File[]) => void;
}

// Full category list including new ones
const categories = [
  "all",
  "uncategorized",
  "outfits",
  "matcha",
  "aesthetic",
  "travel",
  "food",
  "nature",
  "other",
];

// Pretty pastel colors for each category
const categoryColors: Record<string, string> = {
  all: "#FFE5D9",
  uncategorized: "#E5E5E5",
  outfits: "#FFE5D9",
  matcha: "#D8E2DC",
  aesthetic: "#FFCAD4",
  travel: "#B8D8FF",
  food: "#FFF4B5",
  nature: "#CDEAC0",
  other: "#9D8189",
};

const Header: React.FC<HeaderProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  onUpload,
}) => {
  return (
    <header
      className="fixed top-0 left-0 w-full backdrop-blur-md border-b px-4 py-3 z-50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ backgroundColor: "#FFE5D9CC", borderColor: "#D8E2DC" }}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold" style={{ color: "#9D8189" }}>
        jvterest
      </h1>

      {/* Search + Upload */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64"
          style={{
            backgroundColor: "#FFFFFFCC",
            borderColor: "#D8E2DC",
            color: "#9D8189",
          }}
        />

        {/* Hidden file input */}
        <input
          type="file"
          id="upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              onUpload(Array.from(e.target.files));
            }
          }}
        />

        {/* Upload button */}
        <label
          htmlFor="upload"
          className="px-4 py-2 rounded-lg cursor-pointer font-medium shadow-sm hover:opacity-90 transition"
          style={{
            backgroundColor: "#F4ACB7",
            color: "#FFFFFF",
          }}
        >
          Upload
        </label>
      </div>

      {/* Category Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 pt-1 sm:pt-0 no-scrollbar">
        {categories.map((c) => {
          const isActive = category === c.toLowerCase();

          return (
            <button
              key={c}
              onClick={() => setCategory(c.toLowerCase())}
              className={`
                px-4 py-1 rounded-full border transition-all whitespace-nowrap
                ${isActive ? "ring-2 ring-[#F4ACB7] scale-105" : "opacity-80 hover:opacity-100"}
              `}
              style={{
                backgroundColor: categoryColors[c],
                borderColor: "#D8E2DC",
                color: c === "other" ? "white" : "#9D8189",
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
