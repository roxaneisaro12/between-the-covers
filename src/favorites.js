
const STORAGE_KEY = 'between-the-covers-favorites'

export function getFavorites() {
  try {
    const savedBooks = localStorage.getItem(STORAGE_KEY)
    return savedBooks ? JSON.parse(savedBooks) : []
  } catch (error) {
    console.error('Could not load saved books:', error)
    return []
  }
}

export function addFavorite(book) {
  if (!book || !book.id) {
    console.error('A book must have an ID to be saved.')
    return
  }

  const favorites = getFavorites()
  const alreadySaved = favorites.some((favorite) => favorite.id === book.id)

  if (alreadySaved) return

  favorites.push(book)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function removeFavorite(bookId) {
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter(
    (book) => book.id !== bookId
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
}
