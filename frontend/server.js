const express = require("express");
const cors = require("cors");
const path = require("path");

// 1. Create the app FIRST
const app = express(); 

// 2. Use middleware SECOND
app.use(cors({
  origin: "*" 
}));

// 3. Define paths THIRD
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));