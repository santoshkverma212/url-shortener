import { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setShortUrl(data.shortUrl);
      }
    } catch (err) {
      setError(
        "Cannot connect to the server. Make sure the backend is running.",
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="container">
      <h2> URL Shortener</h2>
      <p>Paste your long link below to generate a short URL</p>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="https://example.com..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result-box">
          <p>
            <strong>Your Short URL:</strong>
          </p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <br />
          <br />
          <button onClick={handleCopy} style={{ backgroundColor: "#28a745" }}>
            {copied ? "Copied! ✓" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
