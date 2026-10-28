# Between the Covers

**Between the Covers** is a responsive book discovery website built for the Frontend Phase 1 Capstone. It helps readers discover books, search the Open Library catalogue, and save their favorite titles.

## Features

- **Book discovery:** Browse books retrieved from the Open Library Search API.
- **Book search:** Search for books by title, author, or subject.
- **Favorites:** Save and remove books from your personal reading list.
- **Persistent storage:** Favorites remain saved after refreshing the browser using localStorage.
- **Loading and error states:** Clear feedback while searching, when no books are found, or when a request fails.
- **Responsive layout:** Browse the website on desktop, tablet, and mobile screens.
- **Multiple pages:** Navigate between Home, Favorites, and About.
- **Missing cover handling:** Display a fallback when a book cover is unavailable.

## Technologies

- HTML5
- Tailwind CSS v4
- Vanilla JavaScript and ES modules
- Vite
- Open Library Search API
- Git and GitHub

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and Git.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/roxaneisaro12/between-the-covers.git
   ```

2. Open the project folder:

   ```bash
   cd between-the-covers
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

### Production Build

Run the following command to check the production build:

```bash
npm run build
```

## API

Book search data comes from the [Open Library Search API](https://openlibrary.org/developers/api).

## Project Structure

- `index.html` — Homepage entry point
- `favorites.html` — Saved books page
- `about.html` — About page
- `src/main.js` — Homepage rendering, search, and interactions
- `src/fetchBooks.js` — Asynchronous API requests
- `src/favorites.js` — Saving and removing favorites
- `src/favoritesPage.js` — Favorites page functionality
- `src/style.css` — Website styling

## Project Development

The project was developed in stages:

- **Lab 1:** Responsive multi-page layouts
- **Lab 2:** DOM interactivity and persistent favorites
- **Lab 3:** Asynchronous JavaScript and API integration
- **Lab 4:** GitHub collaboration and project tracking

## Deployment

**Live website:** Add your published GitHub Pages URL here after deployment.

**Repository:** https://github.com/roxaneisaro12/between-the-covers

## Author

Developed by Roxane Isaro as part of the Frontend Phase 1 Capstone.
