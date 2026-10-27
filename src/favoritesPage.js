
import './style.css'
import { getFavorites, removeFavorite } from './favorites.js'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="/">Between <span>the Covers</span></a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a class="active" href="/favorites.html">Favorites</a>
        <a href="/about.html">About</a>
      </div>
    </nav>
  </header>

  <main class="favorites-preview">
    <p class="eyebrow">YOUR PERSONAL BOOKSHELF</p>
    <h1>Your favorite stories.</h1>
    <p class="favorites-intro">The books you save will be waiting for you here.</p>
    <div id="favorites-list" aria-live="polite"></div>
    <p><a class="primary-button" href="/">Explore the collection</a></p>
  </main>

  <footer class="site-footer">
    <a class="brand" href="/">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
  </footer>
`

const favoritesList = document.querySelector('#favorites-list')

function renderFavorites() {
  const books = getFavorites()
  favoritesList.replaceChildren()

  if (books.length === 0) {
    const message = document.createElement('p')
    message.textContent = 'Your bookshelf is empty for now. Explore the collection and save a book you love.'
    favoritesList.append(message)
    return
  }

  books.forEach((book) => {
    const card = document.createElement('article')
    card.className = 'book-card'

    const title = document.createElement('h2')
    title.textContent = book.title || 'Untitled book'

    const author = document.createElement('p')
    author.textContent = book.author || 'Unknown author'

    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.className = 'primary-button'
    removeButton.textContent = 'Remove from favorites'
    removeButton.dataset.removeFavorite = book.id

    card.append(title, author, removeButton)
    favoritesList.append(card)
  })
}

favoritesList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-favorite]')

  if (!button) return

  removeFavorite(button.dataset.removeFavorite)
  renderFavorites()
})

renderFavorites()
