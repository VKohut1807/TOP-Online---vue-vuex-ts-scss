const db = require("../SQLiteDB/db");

const getPopularTags = (req, res) => {
  db.all(
    `SELECT name FROM tags ORDER BY postCount DESC LIMIT 10`,
    (err, rows) => {
      if (err) {
        console.error("Error querying tags (SELECT TAGS):", err.message);
        return res.status(500).json({error: "Server error"});
      }

      const tags = rows.map((row) => row.name);
      res.status(200).json({tags});
    }
  );
};

module.exports = {getPopularTags};
