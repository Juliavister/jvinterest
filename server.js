/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Storage engine for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

// Load DB or create empty
let db = { images: [] };

if (fs.existsSync("./db.json")) {
  db = JSON.parse(fs.readFileSync("./db.json"));
}

// Serve uploaded images publicly
app.use("/uploads", express.static("uploads"));

// GET images
app.get("/images", (req, res) => {
  res.json(db.images);
});

// POST upload image
app.post("/upload", upload.single("image"), (req, res) => {
  const filePath = `uploads/${req.file.filename}`;

  const newImage = {
    id: Date.now().toString(),
    url: `http://localhost:3001/${filePath}`,
    category: "uncategorized",
    tags: [],
    createdAt: Date.now(),
  };

  db.images.unshift(newImage);
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

  res.json(newImage);
});

app.listen(3001, () => {
  console.log("Local image API running at http://localhost:3001");
});
