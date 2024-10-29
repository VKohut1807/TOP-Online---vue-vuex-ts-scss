const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./SQLiteDB/createTables");

const {HTTP_PORT} = require("./constants");
const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/postsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/posts", favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({error: "Route not found"});
});

app.listen(HTTP_PORT, () => {
  console.log(`Proxy server is running on http://localhost:${HTTP_PORT}`);
});
