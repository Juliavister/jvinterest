export interface BoardImage {
  id: string;
  url: string;
  file?: File;
  tags?: string[];
  category?: string; // optional
  createdAt: number; // for sorting
}
