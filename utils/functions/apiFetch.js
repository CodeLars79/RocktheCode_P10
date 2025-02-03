const BASE_URL = 'http://localhost:3000/api/v1'

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`
  const response = await fetch(url, options)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'An error occurred')
  }
  return response.json()
}
