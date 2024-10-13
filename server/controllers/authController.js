const db = require("../SQLiteDB/db");
const {USER_DEF_IMAGE} = require("../constants");

const registerUser = (req, res) => {
  const {username, email, password} = req.body.user;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      console.error("Error checking user:", err.message);
      return res.status(500).json({error: "Server error"});
    }

    if (row) {
      return res.status(400).json({error: "Email already in use"});
    }

    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password],
      function (err) {
        if (err) {
          console.error("Error inserting user:", err.message);
          return res.status(500).json({error: "Server error"});
        }

        const token = `${this.lastID}-token-TEST`;

        db.run(
          `UPDATE users SET token = ? WHERE id = ?`,
          [token, this.lastID],
          (err) => {
            if (err) {
              console.error(
                "Error updating user with access token:",
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
    (err, user_db) => {
      if (err) {
        console.error("Error checking user:", err.message);
        return res.status(500).json({error: "Server error"});
      }

      if (!user_db) {
        return res.status(404).json({error: "User with this email not found"});
      }

      if (user_db.password !== password) {
        return res.status(401).json({error: "Incorrect password"});
      }

      res.status(200).json({
        user: {
          id: user_db.id,
          username: user_db.username,
          email: user_db.email,
          token: user_db.token,
          image: user_db.image,
        },
      });
    }
  );
};

const getUser = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({error: "User not finded"});

  db.get(`SELECT * FROM users WHERE token = ? LIMIT 1`, [token], (err, row) => {
    if (err) {
      console.error("Error querying database:", err.message);
      return res.status(500).json({error: "Server error"});
    }

    if (!row) {
      console.error("User not found");
      return res.status(404).json({error: "User not found"});
    }

    return res.status(200).json({user: row});
  });
};

module.exports = {registerUser, loginUser, getUser};
