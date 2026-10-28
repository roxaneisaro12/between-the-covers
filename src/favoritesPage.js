
import './style.css'
import { getFavorites, removeFavorite } from './favorites.js'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="./">Between <span>the Covers</span></a>

      <div class="nav-links">
        <a href="./">Home</a>
        <a class="active" href="./favorites.html">Favorites</a>
        <a href="./about.html">About</a>
      </div>
    </nav>
  </header>

  <main class="favorites-preview">
    <p class="eyebrow">YOUR PERSONAL BOOKSHELF</p>
    <h1>Your favorite stories.</h1>

    <p class="favorites-intro">
      Every story you save has a place on your personal bookshelf.
    </p>

    <p id="favorites-count" class="favorites-intro"></p>

    <div
      id="favorites-list"
      class="favorites-grid"
      aria-live="polite"
    ></div>

    <p>
      <a class="primary-button" href="./">
        Explore the collection
      </a>
    </p>
  </main>

  <footer class="site-footer">
    <a class="brand" href="./">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
  </footer>
`

const favoritesList = document.querySelector('#favorites-list')
const favoritesCount = document.querySelector('#favorites-count')

function renderFavorites() {
  const books = getFavorites()

  favoritesList.replaceChildren()

  favoritesCount.textContent =
    `${books.length} ${books.length === 1 ? 'book' : 'books'} on your bookshelf`

  if (books.length === 0) {
    const message = document.createElement('p')

    message.className = 'empty-favorites'
    message.textContent =
      'Your bookshelf is empty for now. Explore the collection and save a book you love.'

    favoritesList.append(message)
    return
  }

  books.forEach((book) => {
    const card = document.createElement('article')
    card.className = 'book-card favorite-book-card'

    // Display the saved book cover when available.
    if (book.coverId || book.coverUrl || book.cover) {
      const cover = document.createElement('img')

      cover.className = 'favorite-book-cover'

      cover.src = book.coverId
        ? `https://covers.openlibrary.org/b/id/${encodeURIComponent(book.coverId)}-M.jpg`
        : book.coverUrl || book.cover

      cover.alt = `Cover of ${book.title || 'Untitled book'}`
      cover.loading = 'lazy'

      cover.addEventListener(
        'error',
        () => {
          cover.remove()

          const fallback = document.createElement('div')
          fallback.className = 'cover-placeholder'

          const fallbackTitle = document.createElement('strong')
          fallbackTitle.textContent = book.title || 'Untitled book'

          fallback.append(fallbackTitle)
          card.prepend(fallback)
        },
        { once: true }
      )

      card.append(cover)
    } else {
      // Show a simple placeholder if no cover ID was saved.
      const fallback = document.createElement('div')
      fallback.className = 'cover-placeholder'

      const fallbackTitle = document.createElement('strong')
      fallbackTitle.textContent = book.title || 'Untitled book'

      fallback.append(fallbackTitle)
      card.append(fallback)
    }

    const details = document.createElement('div')
    details.className = 'favorite-book-details'

    const title = document.createElement('h2')
    title.textContent = book.title || 'Untitled book'

    const author = document.createElement('p')
    author.className = 'favorite-book-author'
    author.textContent = book.author || 'Unknown author'

    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.className = 'primary-button'
    removeButton.textContent = 'Remove from favorites'
    removeButton.dataset.removeFavorite = book.id

    details.append(title, author, removeButton)
    card.append(details)
    favoritesList.append(card)
  })
}

// Remove a saved book when its button is clicked.
favoritesList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-favorite]')

  if (!button) return

  removeFavorite(button.dataset.removeFavorite)
  renderFavorites()
})

renderFavorites()
