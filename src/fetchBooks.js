
const API_URL = 'https://openlibrary.org/search.json'

export async function fetchBooks(query = 'fiction') {
  const params = new URLSearchParams({
    q: query,
    fields: 'key,title,author_name,cover_i,first_publish_year,subject',
    limit: '12',
  })

  const response = await fetch(`${API_URL}?${params}`)

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
}
