// src/api/fetchImages.ts

export const fetchImages = async () => {
  const API = import.meta.env.VITE_API_URL;

  const res = await fetch(`${API}/images`);
  return res.json();
};
