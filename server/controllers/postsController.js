const db = require("../SQLiteDB/db");

const getPosts = (req, res) => {
  const {limit, offset} = req.query;

  db.all(
    `SELECT * FROM posts LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, posts) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }

      const authorIds = [...new Set(posts.map((post) => post.authorId))];

      const userPromises = authorIds.map((authorId) => {
        return new Promise((resolve, reject) => {
          db.get(
            `SELECT * FROM users WHERE id = ? LIMIT 1`,
            [authorId],
            (err, user) => {
              if (err) {
                reject(err);
              } else {
                resolve(user);
              }
            }
          );
        });
      });

      Promise.all(userPromises)
        .then((users) => {
          const usersMap = {};

          users.forEach((user) => {
            if (user) {
              usersMap[user.id] = user;
            }
          });

          const postsWithUsers = posts.map((post) => {
            post.tagList = post.tagList
              ? post.tagList.split(",").map((tag) => tag.trim())
              : [];

            return {
              ...post,
              author: usersMap[post.authorId] || null,
            };
          });

          return res.status(200).json({posts: postsWithUsers});
        })
        .catch((err) => {
          console.error("Error fetching users:", err.message);
          res.status(500).json({error: "Server error"});
        });
    }
  );
};

const createPost = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not finded"});

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

      const {title, description, body, tagList} = req.body.post;

      db.get(`SELECT * FROM posts WHERE title = ?`, [title], (err, row) => {
        if (err) {
          console.error("Error checking post:", err.message);
          return res.status(500).json({error: "Server error"});
        }

        if (row) {
          return res.status(400).json({error: "Change the post title"});
        }

        const slug = title.toLowerCase().trim().replace(/ /g, "-");

        db.run(
          `INSERT INTO posts (title, description, body, tagList, slug, authorId) VALUES (?, ?, ?, ?, ?, ?)`,
          [title, description, body, tagList.join(", "), slug, user.id],
          function (err) {
            if (err) {
              console.error("Error inserting post:", err.message);
              return res.status(500).json({error: "Server error"});
            }

            const createdAt = new Date().toISOString();

            res.status(201).json({
              post: {
                id: this.lastID,
                title: title,
                description: description,
                body: body,
                tagList: tagList,
                slug: slug,
                favorited: false,
                favoritesCount: 0,
                authorId: user.id,
                createdAt: createdAt,
              },
            });
          }
        );
      });
    }
  );
};

module.exports = {createPost, getPosts};
