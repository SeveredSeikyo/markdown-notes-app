# Minimal Notes

A sleek, distraction-free markdown note-taking application. This project was built with a "less is more" philosophy—focusing on clean code, a smooth user interface, and a fast, responsive experience.

## Why this exists?
Most note-taking apps are cluttered with features you'll never use. **Minimal Notes** gives you exactly what you need: a place to write in Markdown, a live preview to see your work, and a persistent database to keep your thoughts safe. No flashy gradients, no complex setup—just a simple, clean workspace.

## Key Features

- **Live Markdown Preview**: See your formatting in real-time as you type.
- **Refined Aesthetics**: Uses a "Zinc" inspired monochrome theme that's easy on the eyes.
- **Full CRUD Functionality**: Create new notes, update existing ones, or delete them instantly.
- **Responsive by Design**: Works perfectly on desktops, tablets, and phones. On mobile, the editor takes center stage, with the preview scrolling naturally below it.
- **Human-Readable Code**: The frontend has been refactored to use modern React patterns (like custom hooks) for better maintainability and clarity.

## The Tech Stack

- **Frontend**: Built with **React 19** and **TypeScript** for safety. Powered by **Vite** for lightning-fast builds.
- **Backend**: A lightweight **Node.js** & **Express** server handling the API.
- **Database**: **SQLite3** for simple, file-based persistence (no heavy database setup required).
- **Styling**: Pure, modern **Vanilla CSS** using CSS variables for a consistent look and feel.

## Folder Structure

```text
├── backend/          # Express server & SQLite database logic
│   ├── db/           # Database initialization
│   ├── routes/       # API endpoints (CRUD)
│   └── index.js      # Server entry point
└── frontend/         # React application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── hooks/      # Custom logic (useNotes)
    │   └── services/   # API communication (Axios)
```

## Setup & Installation

### 1. Prerequisites
Make sure you have **Node.js** installed on your machine.

### 2. Getting Started
Clone the repository and jump into the folder:
```bash
git clone https://github.com/SeveredSeikyo/markdown-notes-app.git
cd markdown-notes-app
```

### 3. Run the Backend
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000` by default.

### 4. Run the Frontend
Open a **new terminal** window:
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Contributing
Since this is a minimalist project, I'd love to keep it that way! If you have ideas for improvements that keep things simple and fast, feel free to open a PR.

## License
ISC License. Use it, break it, build something cool with it.
