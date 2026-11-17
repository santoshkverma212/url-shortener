const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Separate database files for testing and production
const dbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "test_urls.db")
    : path.resolve(__dirname, "urls.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      short_code TEXT UNIQUE NOT NULL,
      original_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_short_code ON urls(short_code)`);
});

module.exports = db;
