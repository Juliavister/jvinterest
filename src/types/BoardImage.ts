export interface BoardImage {
  id: string;
  url: string;       // used for preview (same as dataUrl)
  dataUrl: string;   // base64 stored permanently
  file?: File;       // optional
  tags?: string[];
  category?: string;
  createdAt: number;
}
