
import './style.css'
import { getFavorites, addFavorite, removeFavorite } from './favorites.js'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="/">Between <span>the Covers</span></a>

      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/favorites.html">Favorites</a>
        <a href="/about.html">About</a>
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
          <small>ESSAYS & REFLECTIONS</small>
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
        <a class="text-link" href="#books">Discover more &rarr;</a>
      </div>

      <div class="book-grid">
        <article
          class="book-card"
          data-book-id="quiet-garden"
          data-book-title="The Quiet Garden"
          data-book-author="A story about finding your way"
          data-book-category="FICTION"
        >
          <div class="cover cover-sage">
            <span class="cover-label">A NOVEL</span>
            <h3>Where the<br />Green Things Grow</h3>
            <span class="cover-author">A STORY OF BEGINNINGS</span>
          </div>
          <p class="book-category">FICTION</p>
          <h3 class="book-title">The Quiet Garden</h3>
          <p class="book-author">A story about finding your way</p>
          <button class="primary-button favorite-button" type="button">
            Save to favorites
          </button>
        </article>

        <article
          class="book-card"
          data-book-id="slower-day"
          data-book-title="A Slower Kind of Day"
          data-book-author="Reflections on everyday life"
          data-book-category="NONFICTION"
        >
          <div class="cover cover-cream">
            <span class="cover-label">PERSONAL ESSAYS</span>
            <h3>On Finding<br />Your Own Pace</h3>
            <span class="cover-author">SMALL NOTES ON LIFE</span>
          </div>
          <p class="book-category">NONFICTION</p>
          <h3 class="book-title">A Slower Kind of Day</h3>
          <p class="book-author">Reflections on everyday life</p>
          <button class="primary-button favorite-button" type="button">
            Save to favorites
          </button>
        </article>

        <article
          class="book-card"
          data-book-id="between-lines"
          data-book-title="Between the Lines"
          data-book-author="Poems for thoughtful moments"
          data-book-category="POETRY"
        >
          <div class="cover cover-green">
            <span class="cover-label">SELECTED POEMS</span>
            <h3>Things We<br />Cannot Name</h3>
            <span class="cover-author">WORDS & WONDER</span>
          </div>
          <p class="book-category">POETRY</p>
          <h3 class="book-title">Between the Lines</h3>
          <p class="book-author">Poems for thoughtful moments</p>
          <button class="primary-button favorite-button" type="button">
            Save to favorites
          </button>
        </article>

        <article
          class="book-card"
          data-book-id="map-becoming"
          data-book-title="A Map of Becoming"
          data-book-author="A journey of change and belonging"
          data-book-category="CONTEMPORARY"
        >
          <div class="cover cover-white">
            <span class="cover-label">A COMING-OF-AGE STORY</span>
            <h3>All the Places<br />We Become</h3>
            <span class="cover-author">A NOVEL</span>
          </div>
          <p class="book-category">CONTEMPORARY</p>
          <h3 class="book-title">A Map of Becoming</h3>
          <p class="book-author">A journey of change and belonging</p>
          <button class="primary-button favorite-button" type="button">
            Save to favorites
          </button>
        </article>
      </div>

      <p class="collection-note">
        This is a preview of the collection. Real book discovery and search
        will be connected in a later stage.
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
        <a class="text-link" href="/about.html">Read our story &rarr;</a>
      </p>
    </section>

    <section class="favorites-preview" id="favorites">
      <p class="eyebrow">YOUR PERSONAL BOOKSHELF</p>
      <h2>Keep the stories you love close.</h2>
      <p>Your saved books are waiting for you.</p>
      <p>
        <a class="primary-button" href="/favorites.html">View your favorites</a>
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand" href="/">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
    <p class="copyright">&copy; 2026 Between the Covers</p>
  </footer>
`

const bookGrid = document.querySelector('.book-grid')

function updateFavoriteButtons() {
  const favorites = getFavorites()

  document.querySelectorAll('.book-card[data-book-id]').forEach((card) => {
    const button = card.querySelector('.favorite-button')

    const isSaved = favorites.some(
      (book) => book.id === card.dataset.bookId
    )

    button.textContent = isSaved
      ? 'Remove from favorites'
      : 'Save to favorites'

    button.setAttribute('aria-pressed', String(isSaved))
  })
}

bookGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.favorite-button')

  if (!button) return

  const card = button.closest('.book-card')

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

updateFavoriteButtons()
