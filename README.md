# URL Shortener

A full-stack URL shortener application built with Node.js, Express, SQLite, and Vite.
Users can input long URLs to generate clean, shareable short links and get redirected automatically.

## Tech Stack

Frontend: Vite, React / JavaScript, CSS
Backend: Node.js, Express.js, CORS
Database: SQLite (`urls.db`)
ID Generation: NanoID

## Project Structure

url-shortener/
├── backend/ # Express server, API routes, and SQLite database setup
│ ├── app.js
│ ├── app.test.js
│ ├── database.js
│ └── server.js
└── frontend/ # Vite frontend application
├── public/
└── src/

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

[Node.js]
npm (comes with Node.js)

### 1. Clone the Repository

          git clone https://github.com
          cd url-shortener

### 2. Setup and Run the Backend

Open a terminal and navigate to the `backend` folder:

> cd backend
> npm install

_Note: The SQLite database (`urls.db`) will be initialized automatically when the server starts._

### 3. Setup and Run the Frontend

      > cd frontend
      > npm install
      > npm run dev

The frontend will start on `http://localhost:5173`.

## API Endpoints

`POST` => `/api/shorten` Generates a new short code for a valid URL
`GET` => `/:code` Redirects to the original URL matching the short code

## Running Tests

To run the backend tests (`app.test.js`):

> cd backend
> npm test

### 2. Start the Backend and Frontend

Terminal 1 (in `backend`): npm start
Terminal 2 (in `frontend`):npm run dev
