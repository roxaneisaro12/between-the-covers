
import './style.css'

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
    <p>Your saved books will live here. We'll connect this page to the favorites feature in a later stage.</p>
    <p><a class="primary-button" href="/">Explore the collection</a></p>
  </main>

  <footer class="site-footer">
    <a class="brand" href="/">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
  </footer>
`
