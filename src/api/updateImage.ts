export const updateImage = async (id: string, category: string) => {
  const res = await fetch(`http://localhost:3001/update/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });

  return res.json();
};
