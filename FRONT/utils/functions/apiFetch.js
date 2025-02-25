const BASE_URL = 'http://localhost:3000/api/v1'

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorMessage = 'An error occurred'
      try {
        const errorData = await response.json()
        console.error('Error response JSON:', errorData)
        errorMessage = errorData.message || errorMessage
      } catch {
        errorMessage = await response.text()
        console.error('Error response text:', errorMessage)
      }
      throw new Error(errorMessage)
    }

    return response.json()
  } catch (error) {
    console.error('Network or other fetch error:', error)
    throw error
  }
}
