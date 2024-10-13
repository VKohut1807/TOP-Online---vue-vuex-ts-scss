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
      image TEXT DEFAULT "${USER_DEF_IMAGE}"
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      }
    }
  );
});

module.exports = db;
