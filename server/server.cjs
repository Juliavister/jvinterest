const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://localhost:3001";

// Log all requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Load database or initialize
let db = { images: [] };

if (fs.existsSync("./db.json")) {
  db = JSON.parse(fs.readFileSync("./db.json"));
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "." + ext);
  },
});

// Multer must run in manual mode to get form fields + file
const upload = multer({ storage }).single("image");

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Get all images
app.get("/images", (req, res) => {
  res.json(db.images);
});

// Upload route (correct version)
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    console.log("POST /upload");
    console.log("Raw body:", req.body);
    console.log("Received category:", req.body.category);

    const category = req.body.category || "uncategorized";
    const filePath = `uploads/${req.file.filename}`;

    const newImage = {
      id: Date.now().toString(),
      url: `${BASE_URL}/${filePath}`,
      category,
      tags: [],
      createdAt: Date.now(),
    };

    db.images.unshift(newImage);
    fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

    res.json(newImage);
  });
});

// UPDATE category route
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { category } = req.body;

  console.log("Updating:", id, "→", category);

  const image = db.images.find((img) => img.id === id);

  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  image.category = category;
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

  res.json({ success: true, image });
});

app.listen(3001, () => {
  console.log("Local image API running at http://localhost:3001");
});
