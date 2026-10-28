
import './style.css'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <nav class="navigation" aria-label="Main navigation">
      <a class="brand" href="./">Between <span>the Covers</span></a>
      <div class="nav-links">
        <a href="./">Home</a>
        <a href="./favorites.html">Favorites</a>
        <a class="active" href="./about.html">About</a>
      </div>
    </nav>
  </header>

  <main class="about-section">
    <p class="eyebrow">OUR STORY</p>
    <h1>Every reader has a story.</h1>
    <p>Between the Covers is a thoughtful space to discover books, save the stories you love, and explore new perspectives.</p>
    <p>Our goal is simple: make finding your next read feel personal, calm, and inspiring.</p>
    <p><a class="primary-button" href="./">Explore the collection</a></p>
  </main>

  <footer class="site-footer">
    <a class="brand" href="./">Between <span>the Covers</span></a>
    <p>A thoughtful place for your next chapter.</p>
  </footer>
`
