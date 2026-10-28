
import './style.css'
import { getFavorites, addFavorite, removeFavorite } from './favorites.js'
import { fetchBooks } from './fetchBooks.js'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="./">Between <span>the Covers</span></a>

      <div class="nav-links">
        <a href="./">Home</a>
        <a href="./favorites.html">Favorites</a>
        <a href="./about.html">About</a>
      </div>
    </nav>
  </header>

  <main id="home">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">A LITTLE SPACE FOR BOOK LOVERS</p>

        <h1>Stories worth <em>getting lost.</em><br />in</h1>

        <p class="hero-description">
          Discover new books, revisit old favorites, and find
          the stories that stay with you long after the last page.
        </p>

        <a class="primary-button" href="#books">Explore the collection</a>

        <p class="hero-note">Good books. Quiet moments. New perspectives.</p>
      </div>

      <div class="hero-art" aria-label="Illustration of a stack of books">
        <div class="book book-one">
          <span>THE ART OF</span>
          <strong>SLOW<br />LIVING</strong>
          <small>NOTES ON EVERYDAY LIFE</small>
        </div>
        <div class="book book-two">
          <span>SELECTED STORIES</span>
          <strong>Little<br />Worlds</strong>
          <small>A COLLECTION</small>
        </div>
        <div class="book book-three">
          <span>A FIELD GUIDE TO</span>
          <strong>WILD<br />THOUGHTS</strong>
          <small>ESSAYS &amp; REFLECTIONS</small>
        </div>
        <p class="art-caption">Every book opens a new door.</p>
      </div>
    </section>

    <section class="collection" id="books">
      <div class="section-heading">
        <div>
          <p class="eyebrow">YOUR NEXT READ STARTS HERE</p>
          <h2>A shelf worth exploring</h2>
        </div>
      </div>

      <form class="book-search-form" id="book-search-form" role="search">
        <label for="book-search">Find your next read</label>

        <div class="book-search-controls">
          <input
            id="book-search"
            name="query"
            type="search"
            placeholder="Search books, authors, or subjects..."
            autocomplete="off"
            required
          />

          <button class="primary-button" type="submit">
            Search books
          </button>
        </div>
      </form>

      <p
        class="search-status"
        id="search-status"
        role="status"
        aria-live="polite"
      >
        Loading books...
      </p>

      <div class="book-grid" aria-label="Book search results"></div>

      <p class="collection-note">
        Discover books from the Open Library catalogue and save the ones
        you would love to read.
      </p>
    </section>

    <section class="about-section" id="about">
      <p class="eyebrow">MORE THAN JUST A READING LIST</p>
      <h2>Make room for a good story.</h2>
      <p>
        Between the Covers is a place to discover books, keep track of
        the ones you love, and make your reading journey your own.
      </p>
      <p>
        <a class="text-link" href="./about.html">Read our story &rarr;</a>
      </p>
    </section>

    <section class="favorites-preview" id="favorites">
      <p class="eyebrow">YOUR PERSONAL BOOKSHELF</p>
      <h2>Keep the stories you love close.</h2>
      <p>Your saved books are waiting for you.</p>
      <p>
        <a class="primary-button" href="./favorites.html">View your favorites</a>
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand" href="./">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
    <p class="copyright">&copy; 2026 Between the Covers</p>
  </footer>
`

const bookGrid = document.querySelector('.book-grid')
const searchForm = document.querySelector('#book-search-form')
const searchInput = document.querySelector('#book-search')
const searchStatus = document.querySelector('#search-status')

function updateFavoriteButtons() {
  const favorites = getFavorites()

  document.querySelectorAll('.book-card[data-book-id]').forEach((card) => {
    const button = card.querySelector('.favorite-button')
    if (!button) return

    const isSaved = favorites.some(
      (book) => book.id === card.dataset.bookId
    )

    button.textContent = isSaved
      ? 'Remove from favorites'
      : 'Save to favorites'

    button.setAttribute('aria-pressed', String(isSaved))
  })
}

function createCoverFallback(book, cover) {
  cover.classList.add('cover-placeholder')

  const fallback = document.createElement('div')
  fallback.className = 'cover-fallback'

  const label = document.createElement('span')
  label.textContent = 'BETWEEN THE COVERS'

  const title = document.createElement('strong')
  title.textContent = book.title

  fallback.append(label, title)
  cover.append(fallback)
}

function createBookCard(book) {
  const card = document.createElement('article')
  card.className = 'book-card'
  card.dataset.bookId = book.id
  card.dataset.bookTitle = book.title
  card.dataset.bookAuthor = book.author
  card.dataset.bookCategory = book.category || 'BOOK'

  const cover = document.createElement('div')
  cover.className = 'cover cover-sage'

  if (book.coverId) {
    const image = document.createElement('img')

    image.src =
      `https://covers.openlibrary.org/b/id/${encodeURIComponent(book.coverId)}-M.jpg`

    image.alt = `Cover of ${book.title}`
    image.loading = 'lazy'

    image.addEventListener('error', () => {
      image.remove()
      createCoverFallback(book, cover)
    }, { once: true })

    cover.append(image)
  } else {
    createCoverFallback(book, cover)
  }

  const category = document.createElement('p')
  category.className = 'book-category'
  category.textContent = book.category || 'BOOK'

  const title = document.createElement('h3')
  title.className = 'book-title'
  title.textContent = book.title

  const author = document.createElement('p')
  author.className = 'book-author'
  author.textContent = book.author

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

function displayBooks(books) {
  bookGrid.replaceChildren()

  if (!books.length) {
    searchStatus.textContent =
      'No books found. Try another title, author, or subject.'
    return
  }

  const fragment = document.createDocumentFragment()

  books.forEach((book) => {
    fragment.append(createBookCard(book))
  })

  bookGrid.append(fragment)

  // Keep successful results clean: no book-count message.
  searchStatus.textContent = ''

  updateFavoriteButtons()
}

async function searchBooks(query) {
  searchStatus.textContent = 'Searching the Open Library catalogue...'
  bookGrid.replaceChildren()

  const submitButton = searchForm.querySelector('button[type="submit"]')
  submitButton.disabled = true

  try {
    const books = await fetchBooks(query)
    displayBooks(books)
  } catch (error) {
    console.error('Book search failed:', error)

    searchStatus.textContent =
      error.message || 'Unable to load books. Please try again.'

    bookGrid.replaceChildren()
  } finally {
    submitButton.disabled = false
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const query = searchInput.value.trim()

  if (!query) {
    searchStatus.textContent =
      'Enter a book title, author, or subject to search.'

    searchInput.focus()
    return
  }

  searchBooks(query)
})

bookGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.favorite-button')
  if (!button) return

  const card = button.closest('.book-card')
  if (!card) return

  const book = {
    id: card.dataset.bookId,
    title: card.dataset.bookTitle,
    author: card.dataset.bookAuthor,
    category: card.dataset.bookCategory,
  }

  const favorites = getFavorites()
  const isSaved = favorites.some((favorite) => favorite.id === book.id)

  if (isSaved) {
    removeFavorite(book.id)
  } else {
    addFavorite(book)
  }

  updateFavoriteButtons()
})

// Load real books when the homepage opens.
searchBooks('fiction')
