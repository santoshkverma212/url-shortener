const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// 1. POST API: Shorten a URL
app.post("/api/shorten", (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid URL (e.g., https://google.com)" });
  }

  const shortCode = nanoid(6);

  const query = `INSERT INTO urls (short_code, original_url) VALUES (?, ?)`;
  db.run(query, [shortCode, originalUrl], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to save URL to the database" });
    }
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.status(201).json({
      shortCode,
      shortUrl: `${baseUrl}/${shortCode}`,
      originalUrl,
    });
  });
});

// GET API: Redirect short URL to original URL
app.get("/:code", (req, res) => {
  const { code } = req.params;

  db.get(
    `SELECT original_url FROM urls WHERE short_code = ?`,
    [code],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (row) {
        return res.redirect(302, row.original_url);
      } else {
        return res.status(404).json({ error: "Short URL not found" });
      }
    },
  );
});

module.exports = app;
