const crypto = require('crypto');
global.crypto = crypto;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình CORS linh hoạt cho Production
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());

// API Test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend đã được Auto-Deploy thành công!" });
});

// Kết nối MongoDB Atlas
const MONGO_URL = process.env.MONGO_URI || "mongodb+srv://huyle_user:Letruonghuy211@cluster0.lzelvpa.mongodb.net/cloud-lab?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("✅ Kết nối MongoDB Atlas thành công!");
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Lỗi kết nối MongoDB:", error);
  });

// ------------------- REST API -------------------
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});