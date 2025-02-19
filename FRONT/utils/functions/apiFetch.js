const BASE_URL = 'http://localhost:3000/api/v1'

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`
  const response = await fetch(url, options)

  if (!response.ok) {
    let errorMessage = 'An error occurred'
    try {
      const errorData = await response.json()
      console.error('Error response JSON:', errorData) // <-- Imprime el error recibido del servidor
      errorMessage = errorData.message || errorMessage
    } catch {
      errorMessage = await response.text()
      console.error('Error response text:', errorMessage) // <-- Imprime el error en texto plano
    }
    throw new Error(errorMessage)
  }

  return response.json()
}
