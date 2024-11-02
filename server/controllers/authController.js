const db = require("../SQLiteDB/db");
const {USER_DEF_IMAGE} = require("../constants");

const registerUser = (req, res) => {
  const {username, email, password} = req.body.user;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user_email) => {
    if (err) {
      console.error("Error querying database (SELECT USER):", err.message);
      return res.status(500).json({error: "Server error"});
    }

    if (user_email) {
      return res.status(400).json({error: "Email already in use"});
    }

    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password],
      function (err) {
        if (err) {
          console.error("Error querying database (INSERT USER):", err.message);
          return res.status(500).json({error: "Server error"});
        }

        const token = `${this.lastID}-token-TEST`;

        db.run(
          `UPDATE users SET token = ? WHERE id = ?`,
          [token, this.lastID],
          function (err) {
            if (err) {
              console.error(
                "Error querying database (UPDATE USER):",
                err.message
              );
              return res.status(500).json({error: "Server error"});
            }

            res.status(201).json({
              user: {
                id: this.lastID,
                username: username,
                email: email,
                token: token,
                image: USER_DEF_IMAGE,
                bio: null,
                password: password,
              },
            });
          }
        );
      }
    );
  });
};

const loginUser = (req, res) => {
  const {email, password} = req.body.user;

  db.get(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email],
    (err, user) => {
      if (err) {
        console.error("Error querying database (UPDATE USER):", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (!user) {
        console.error("User not found");
        return res.status(404).json({error: "User not found"});
      }

      if (user.password !== password) {
        console.error("Incorrect password");
        return res.status(401).json({error: "Incorrect password"});
      }

      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token,
          image: user.image,
          bio: user.bio,
          password: user.password,
        },
      });
    }
  );
};

const getUser = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not finded"});

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

      return res.status(200).json({user: user});
    }
  );
};

const updateUser = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not finded"});

  const {username, email, image, bio, password} = req.body.user;

  db.get(
    `SELECT * FROM users WHERE token = ? LIMIT 1`,
    [token],
    (err, user) => {
      if (err) {
        console.error("Error querying database (SELECT USER):", err.message);
        return res.status(500).json({error: "Server error"});
      }

      let fieldsToUpdate = [];
      let queryParams = [];

      if (username) {
        fieldsToUpdate.push("username = ?");
        queryParams.push(username);
      }

      if (email) {
        fieldsToUpdate.push("email = ?");
        queryParams.push(email);
      }

      if (image) {
        fieldsToUpdate.push("image = ?");
        queryParams.push(image);
      }

      if (bio) {
        fieldsToUpdate.push("bio = ?");
        queryParams.push(bio);
      }

      if (password) {
        fieldsToUpdate.push("password = ?");
        queryParams.push(password);
      }

      if (fieldsToUpdate.length <= 0) {
        return res.status(400).json({error: "No data to update"});
      }

      db.run(
        `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
        [...queryParams, user.id],
        function (err) {
          if (err) {
            console.error(
              "Error querying database (UPDATE USER):",
              err.message
            );
            return res.status(500).json({error: "Server error"});
          }

          res.status(200).json({
            message: "User updated successfully",
            user: {
              username: username || user.username,
              email: email || user.email,
              image: image || user.image,
              bio: bio || user.bio,
              password: password || user.password,
              token: user.token,
            },
          });
        }
      );
    }
  );
};

module.exports = {registerUser, loginUser, getUser, updateUser};
