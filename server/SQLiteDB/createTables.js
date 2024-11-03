const db = require("./db");
const {USER_DEF_IMAGE} = require("../constants");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      username VARCHAR(20) NOT NULL,
      email VARCHAR(20) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL,
      token VARCHAR(30) NULL UNIQUE,
      image TEXT DEFAULT "${USER_DEF_IMAGE}",
      bio TEXT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      title VARCHAR(30) NOT NULL,
      description TEXT,
      body TEXT NOT NULL,
      tagList VARCHAR(20),
      slug VARCHAR(30) NOT NULL,
      favoritesCount INTEGER DEFAULT 0,
      authorId INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(authorId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        console.error("Error creating posts table:", err.message);
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      userId INTEGER NOT NULL,
      postId INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(postId) REFERENCES posts(id)
    )`,
    (err) => {
      if (err) {
        console.error("Error creating favorites table:", err.message);
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      postIds VARCHAR(20) NOT NULL,  
      postCount INTEGER DEFAULT 0
    )`,
    (err) => {
      if (err) {
        console.error("Error creating tags table:", err.message);
      }
    }
  );
});

module.exports = db;
