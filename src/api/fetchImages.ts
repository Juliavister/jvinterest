import { BoardImage } from "../types/BoardImage";

export const fetchImages = async (): Promise<BoardImage[]> => {
  const res = await fetch("http://localhost:3001/images");
  return res.json();
};
