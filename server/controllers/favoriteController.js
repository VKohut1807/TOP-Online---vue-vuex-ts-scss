const db = require("../SQLiteDB/db");

const addToFavoritePost = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not authorized"});

  db.get(
    `SELECT * FROM users WHERE token = ? LIMIT 1`,
    [token],
    (err, user) => {
      if (err) {
        console.error("Error querying database:", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (!user) {
        console.error("User not found");
        return res.status(404).json({error: "User not found"});
      }

      const slug = req.params.slug;

      db.run(
        `UPDATE posts SET favorited = true, favoritesCount = favoritesCount + 1, updatedAt = CURRENT_TIMESTAMP WHERE slug = ?`,
        [slug],
        function (err) {
          if (err) {
            console.error("Error updating post to favorited:", err.message);
            return res.status(500).json({error: "Database error"});
          }
          res
            .status(200)
            .json({message: "Added to favorites", updatedRows: this.changes});
        }
      );
    }
  );
};

const removeFromFavoritePost = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not authorized"});

  db.get(
    `SELECT * FROM users WHERE token = ? LIMIT 1`,
    [token],
    (err, user) => {
      if (err) {
        console.error("Error querying database:", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (!user) {
        console.error("User not found");
        return res.status(404).json({error: "User not found"});
      }

      const slug = req.params.slug;

      db.run(
        `UPDATE posts SET favorited = false, favoritesCount = favoritesCount - 1, updatedAt = CURRENT_TIMESTAMP WHERE slug = ?`,
        [slug],
        function (err) {
          if (err) {
            console.error("Error updating post to favorited:", err.message);
            return res.status(500).json({error: "Database error"});
          }
          res
            .status(200)
            .json({message: "Added to favorites", updatedRows: this.changes});
        }
      );
    }
  );
};

module.exports = {addToFavoritePost, removeFromFavoritePost};
