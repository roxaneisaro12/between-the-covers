
import './style.css'
import { getFavorites, addFavorite, removeFavorite } from './favorites.js'
import { fetchBooks } from './fetchBooks.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="./">Between <span>the Covers</span></a>

      <div class="nav-links">
        <a class="active" href="./">Home</a>
        <a href="./favorites.html">Favorites</a>
        <a href="./about.html">About</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">A LITTLE SPACE FOR BIG STORIES</p>
      <h1>Find your next <em>favorite</em> story.</h1>
      <p>Discover books, explore new ideas, and build a bookshelf of your own.</p>
    </section>

    <section class="collection">
      <form id="search-form" class="search-form">
        <label for="book-search">Search for a book</label>
        <div class="search-controls">
          <input
            id="book-search"
            name="query"
            type="search"
            placeholder="Try a title or author..."
            required
          >
          <button class="primary-button" type="submit">Search books</button>
        </div>
      </form>

      <p id="status-message" aria-live="polite"></p>
      <div id="book-grid" class="book-grid"></div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand" href="./">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
  </footer>
`

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#book-search')
const bookGrid = document.querySelector('#book-grid')
const statusMessage = document.querySelector('#status-message')

function createCoverFallback(book, cover) {
  cover.classList.add('cover-placeholder')

  const fallback = document.createElement('div')
  fallback.className = 'cover-fallback'

  const label = document.createElement('span')
  label.textContent = 'BETWEEN THE COVERS'

  const title = document.createElement('strong')
  title.textContent = book.title || 'Untitled book'

  fallback.append(label, title)
  cover.append(fallback)
}

function createBookCard(book) {
  const card = document.createElement('article')
  card.className = 'book-card'
  card.dataset.bookId = book.id
  card.dataset.bookTitle = book.title || 'Untitled book'
  card.dataset.bookAuthor = book.author || 'Unknown author'
  card.dataset.bookCategory = book.category || 'BOOK'

  // Keep the cover ID so it can be saved with the favorite.
  card.dataset.bookCoverId = book.coverId || ''

  const cover = document.createElement('div')
  cover.className = 'cover cover-sage'

  if (book.coverId) {
    const image = document.createElement('img')

    image.src =
      `https://covers.openlibrary.org/b/id/${encodeURIComponent(book.coverId)}-M.jpg`

    image.alt = `Cover of ${book.title || 'Untitled book'}`
    image.loading = 'lazy'

    image.addEventListener(
      'error',
      () => {
        image.remove()
        createCoverFallback(book, cover)
      },
      { once: true }
    )

    cover.append(image)
  } else {
    createCoverFallback(book, cover)
  }

  const category = document.createElement('p')
  category.className = 'book-category'
  category.textContent = book.category || 'BOOK'

  const title = document.createElement('h3')
  title.className = 'book-title'
  title.textContent = book.title || 'Untitled book'

  const author = document.createElement('p')
  author.className = 'book-author'
  author.textContent = book.author || 'Unknown author'

  const favoriteButton = document.createElement('button')
  favoriteButton.className = 'primary-button favorite-button'
  favoriteButton.type = 'button'
  favoriteButton.textContent = 'Save to favorites'

  card.append(cover, category, title, author)

  if (book.year) {
    const year = document.createElement('p')
    year.className = 'book-year'
    year.textContent = `First published: ${book.year}`
    card.append(year)
  }

  card.append(favoriteButton)

  return card
}

function updateFavoriteButtons() {
  const favorites = getFavorites()

  bookGrid.querySelectorAll('.book-card').forEach((card) => {
    const button = card.querySelector('.favorite-button')
    const isSaved = favorites.some(
      (book) => book.id === card.dataset.bookId
    )

    button.textContent = isSaved ? 'Remove from favorites' : 'Save to favorites'
    button.setAttribute('aria-pressed', String(isSaved))
  })
}

async function searchBooks(query) {
  statusMessage.textContent = 'Searching for books...'
  bookGrid.replaceChildren()

  try {
    const books = await fetchBooks(query)

    if (!Array.isArray(books) || books.length === 0) {
      statusMessage.textContent = 'No books found. Try another title or author.'
      return
    }

    books.forEach((book) => {
      bookGrid.append(createBookCard(book))
    })

    statusMessage.textContent = `Found ${books.length} books.`
    updateFavoriteButtons()
  } catch (error) {
    console.error('Could not load books:', error)
    statusMessage.textContent =
      'We could not load books right now. Please try again.'
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()

  if (!query) {
    statusMessage.textContent = 'Please enter a book title or author.'
    return
  }

  searchBooks(query)
})

bookGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.favorite-button')

  if (!button) return

  const card = button.closest('.book-card')
  if (!card) return

  // Save the cover ID together with the book details.
  const book = {
    id: card.dataset.bookId,
    title: card.dataset.bookTitle,
    author: card.dataset.bookAuthor,
    category: card.dataset.bookCategory,
    coverId: card.dataset.bookCoverId || null,
  }

  const favorites = getFavorites()
  const isSaved = favorites.some(
    (favorite) => favorite.id === book.id
  )

  if (isSaved) {
    removeFavorite(book.id)
  } else {
    addFavorite(book)
  }

  updateFavoriteButtons()
})

// Load an initial collection when the Home page opens.
searchBooks('bestsellers')
