// src/api/uploadImage.ts

export const uploadImage = async (file: File, category: string) => {
  const API = import.meta.env.VITE_API_URL;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("category", category);

  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};
