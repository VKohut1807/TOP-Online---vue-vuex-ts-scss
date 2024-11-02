const db = require("../SQLiteDB/db");

const toggleFavoritePost = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not authorized"});

  db.get(
    `SELECT * FROM users WHERE token = ? LIMIT 1`,
    [token],
    (err, user) => {
      if (err) {
        console.error("Error querying database (SELECT USER):", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (!user) {
        console.error("User not found");
        return res.status(404).json({error: "User not found"});
      }

      const slug = req.params.slug;

      db.get(`SELECT id FROM posts WHERE slug = ?`, [slug], (err, post) => {
        if (err) {
          console.error("Error querying database (SELECT POST):", err.message);
          return res.status(500).json({error: "Server error"});
        }

        if (!post) {
          console.error("Post not found");
          return res.status(404).json({error: "Post not found"});
        }

        db.get(
          `SELECT * FROM favorites WHERE userId = ? AND postId = ?`,
          [user.id, post.id],
          (err, favorite) => {
            if (err) {
              console.error(
                "Error querying database (SELECT FAVORITE POST):",
                err.message
              );
              return res.status(500).json({error: "Server error"});
            }

            if (favorite) {
              db.run(
                `DELETE FROM favorites WHERE userId = ? AND postId = ?`,
                [user.id, post.id],
                (err) => {
                  if (err) {
                    console.error(
                      "Error querying database (DELETE FAVORITE POST):",
                      err.message
                    );
                    return res.status(500).json({error: "Server error"});
                  }

                  db.run(
                    `UPDATE posts SET favoritesCount = favoritesCount - 1, updatedAt = CURRENT_TIMESTAMP WHERE slug = ?`,
                    [slug],
                    (err) => {
                      if (err) {
                        console.error(
                          "Error querying database (UPDATE POST):",
                          err.message
                        );
                        return res.status(500).json({error: "Server error"});
                      }

                      res.status(200).json({
                        message: "Removed from favorites and post updated",
                      });
                    }
                  );
                }
              );
            } else {
              db.run(
                `INSERT INTO favorites (userId, postId) VALUES (?, ?)`,
                [user.id, post.id],
                (err) => {
                  if (err) {
                    console.error(
                      "Error querying database (INSERT FAVORITE POST):",
                      err.message
                    );
                    return res.status(500).json({error: "Server error"});
                  }

                  db.run(
                    `UPDATE posts SET favoritesCount = favoritesCount + 1, updatedAt = CURRENT_TIMESTAMP WHERE slug = ?`,
                    [slug],
                    (err) => {
                      if (err) {
                        console.error(
                          "Error querying database (UPDATE POST):",
                          err.message
                        );
                        return res.status(500).json({error: "Server error"});
                      }

                      res.status(200).json({
                        message: "Added to favorites and post updated",
                      });
                    }
                  );
                }
              );
            }
          }
        );
      });
    }
  );
};

module.exports = {toggleFavoritePost};
