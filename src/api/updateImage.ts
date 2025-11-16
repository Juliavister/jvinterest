// src/api/updateImage.ts

export const updateImage = async (id: string, category: string) => {
  const API = import.meta.env.VITE_API_URL;

  const res = await fetch(`${API}/update/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });

  return res.json();
};
