import { useEffect, useState } from "react";
import ImageGrid from "./components/ImageGrid";
import ImageModal from "./components/ImageModal";
import Header from "./components/Header";
import UploadModal from "./components/UploadModal";
import { BoardImage } from "./types/BoardImage";
import { fetchImages } from "./api/fetchImages";
import { uploadImage } from "./api/uploadImage";

const shuffleArray = (arr: any[]) =>
  arr
    .map((x) => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.x);

function App() {
  const [images, setImages] = useState<BoardImage[]>([]);
  const [selected, setSelected] = useState<BoardImage | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const load = async () => {
      const list = await fetchImages();
      setImages(shuffleArray(list));
    };
    load();
  }, []);

  const handleUpload = (files: File[]) => setPendingFiles(files);

  const confirmUpload = async (selectedCategory: string) => {
    if (!pendingFiles) return;

    const uploaded: BoardImage[] = [];
    for (const file of pendingFiles) {
      uploaded.push(await uploadImage(file, selectedCategory));
    }

    setImages((prev) => shuffleArray([...uploaded, ...prev]));
    setPendingFiles(null);
  };

  const filteredImages = images.filter((img) => {
    const cat = (img.category || "").toLowerCase();
    const sel = category.toLowerCase();

    const matchCat = sel === "all" || cat === sel;

    const matchSearch =
      search.trim() === "" ||
      cat.includes(search.toLowerCase()) ||
      img.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-pale-oak-50 pt-32">
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        onUpload={handleUpload}
      />

      <ImageGrid images={filteredImages} onSelect={setSelected} />

      {selected && (
  <ImageModal
    image={selected}
    onClose={() => setSelected(null)}
    onUpdate={(updatedImage) => {
      setImages((prev) =>
        prev.map((img) => (img.id === updatedImage.id ? updatedImage : img))
      );
    }}
  />
)}

      {pendingFiles && (
        <UploadModal
          files={pendingFiles}
          onCancel={() => setPendingFiles(null)}
          onConfirm={confirmUpload}
        />
      )}
    </div>
  );
}

export default App;
