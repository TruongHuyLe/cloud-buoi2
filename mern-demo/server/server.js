const crypto = require('crypto');
global.crypto = crypto;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend đang hoạt động!" });
});

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)   // dùng đúng tên biến trong .env
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
