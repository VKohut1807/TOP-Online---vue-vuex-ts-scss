const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./SQLiteDB/createTables");

const {HTTP_PORT} = require("./constants");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", authRoutes);

app.use((req, res) => {
  res.status(404).json({error: "Route not found"});
});

app.listen(HTTP_PORT, () => {
  console.log(`Proxy server is running on http://localhost:${HTTP_PORT}`);
});
