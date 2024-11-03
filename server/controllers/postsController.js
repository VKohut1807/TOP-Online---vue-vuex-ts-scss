const db = require("../SQLiteDB/db");

const getPosts = (req, res) => {
  const {limit, offset} = req.query;
  const token = req.headers.authorization;

  db.all(
    `SELECT posts.*, users.id AS authorId, users.username, users.email, users.image 
    FROM posts 
    LEFT JOIN users ON posts.authorId = users.id 
    LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, posts) => {
      if (err) {
        console.error("Error querying database (SELECT POST):", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (token) {
        db.get(
          `SELECT id FROM users WHERE token = ? LIMIT 1`,
          [token],
          (err, user) => {
            if (err) {
              console.error(
                "Error querying database (SELECT USER):",
                err.message
              );
              return res.status(500).json({error: "Server error"});
            }

            if (user) {
              db.all(
                `SELECT postId FROM favorites WHERE userId = ?`,
                [user.id],
                (err, favorites) => {
                  if (err) {
                    console.error(
                      "Error querying database (SELECT FAVORITE POST):",
                      err.message
                    );
                    return res.status(500).json({error: "Server error"});
                  }

                  const userFavorites = new Set(
                    favorites.map((fav) => fav.postId)
                  );

                  const postsWithUsers = posts.map((post) => {
                    post.tagList = post.tagList
                      ? post.tagList.split(",").map((tag) => tag.trim())
                      : [];

                    return {
                      ...post,
                      favorited: userFavorites.has(post.id),
                      author: {
                        id: post.authorId,
                        username: post.username,
                        email: post.email,
                        image: post.image,
                      },
                    };
                  });

                  return res.status(200).json({posts: postsWithUsers});
                }
              );
            } else {
              const postsWithUsers = posts.map((post) => {
                post.tagList = post.tagList
                  ? post.tagList.split(",").map((tag) => tag.trim())
                  : [];

                return {
                  ...post,
                  favorited: false,
                  author: {
                    id: post.authorId,
                    username: post.username,
                    email: post.email,
                    image: post.image,
                  },
                };
              });

              return res.status(200).json({posts: postsWithUsers});
            }
          }
        );
      } else {
        const postsWithUsers = posts.map((post) => {
          post.tagList = post.tagList
            ? post.tagList.split(",").map((tag) => tag.trim())
            : [];

          return {
            ...post,
            favorited: false,
            author: {
              id: post.authorId,
              username: post.username,
              email: post.email,
              image: post.image,
            },
          };
        });

        return res.status(200).json({posts: postsWithUsers});
      }
    }
  );
};

const createPost = (req, res) => {
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

      const {title, description, body, tagList} = req.body.post;

      db.get(`SELECT * FROM posts WHERE title = ?`, [title], (err, post) => {
        if (err) {
          console.error("Error checking post (SELECT POST):", err.message);
          return res.status(500).json({error: "Server error"});
        }

        if (post) {
          console.error("Change the post title:", err.message);
          return res.status(400).json({error: "Change the post title"});
        }

        const slug = title.toLowerCase().trim().replace(/ /g, "-");
        const uniqueTagList = [...new Set(tagList)];

        db.run(
          `INSERT INTO posts (title, description, body, tagList, slug, authorId) VALUES (?, ?, ?, ?, ?, ?)`,
          [title, description, body, uniqueTagList.join(", "), slug, user.id],
          function (err) {
            if (err) {
              console.error("Error inserting post (INSERT POST):", err.message);
              return res.status(500).json({error: "Server error"});
            }

            const createdAt = new Date().toISOString();
            const postId = this.lastID;

            uniqueTagList.forEach((unic_tag) => {
              db.get(
                `SELECT * FROM tags WHERE name = ?`,
                [unic_tag],
                (err, tag) => {
                  if (err) {
                    console.error(
                      "Error querying database (SELECT TAG):",
                      err.message
                    );
                    return res.status(500).json({error: "Server error"});
                  }

                  if (tag) {
                    const postIds = tag.postIds ? tag.postIds.split(",") : [];

                    if (!postIds.includes(postId.toString())) {
                      postIds.push(postId);
                      const newPostIds = postIds.join(",");

                      db.run(
                        `UPDATE tags SET postIds = ?, postCount = postCount + 1 WHERE id = ?`,
                        [newPostIds, tag.id],
                        (err) => {
                          if (err) {
                            console.error(
                              "Error querying database (UPDATE TAG):",
                              err.message
                            );
                            return res
                              .status(500)
                              .json({error: "Server error"});
                          }
                        }
                      );
                    }
                  } else {
                    db.run(
                      `INSERT INTO tags (name, postIds, postCount) VALUES (?, ?, ?)`,
                      [unic_tag, postId, 1],
                      (err) => {
                        if (err) {
                          console.error(
                            "Error querying database (INSERT TAG):",
                            err.message
                          );
                          return res.status(500).json({error: "Server error"});
                        }
                      }
                    );
                  }
                }
              );
            });

            res.status(201).json({
              post: {
                id: postId,
                title: title,
                description: description,
                body: body,
                tagList: uniqueTagList,
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
