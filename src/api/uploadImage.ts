export const uploadImage = async (file: File, category: string) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("category", category); // 🔥 IMPORTANT

  const res = await fetch("http://localhost:3001/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
};
