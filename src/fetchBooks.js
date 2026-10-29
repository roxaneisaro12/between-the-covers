
const API_URL = 'https://openlibrary.org/search.json'
const TIMEOUT_MS = 10000

export async function fetchBooks(query = 'fiction') {
  const controller = new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, TIMEOUT_MS)

  try {
    const params = new URLSearchParams({
      q: query,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject',
      limit: '12',
    })

    const response = await fetch(`${API_URL}?${params}`, {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error('Unable to load books. Please try again.')
    }

    const data = await response.json()

    return data.docs.map((book) => ({
      id: book.key,
      title: book.title || 'Untitled',
      author: book.author_name?.join(', ') || 'Unknown author',
      coverId: book.cover_i || null,
      year: book.first_publish_year || null,
      subjects: book.subject || [],
    }))
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'Loading took too long. Please check your connection and try again.',
      )
    }

    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
