const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123.456", // 🔴 Put your real MySQL password here
  database: "studygroup"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// ✅ Get all study groups
app.get("/groups", (req, res) => {
  db.query("SELECT * FROM studygroup", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch groups" });
    }
    res.json(result);
  });
});

// ✅ Create new study group
app.post("/groups", (req, res) => {
  const { subject, description, createdBy } = req.body;

  db.query(
    "INSERT INTO studygroup (subject, description, createdBy) VALUES (?, ?, ?)",
    [subject, description, createdBy],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to create group" });
      }
      res.json({ message: "Group Created Successfully" });
    }
  );
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});