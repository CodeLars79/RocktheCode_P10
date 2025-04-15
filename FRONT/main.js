import './style.css'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Home } from './pages/Home/Home'
import { Footer } from './components/Footer/Footer'

const validateToken = async () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Invalid token')
    }

    const data = await response.json()
    return data.valid
  } catch (error) {
    console.error('Error validating token:', error)
    localStorage.removeItem('token')
    return false
  }
}

const openApp = async () => {
  const isValidToken = await validateToken()

  if (!isValidToken) {
    console.log('No active session or the token is invalid')
  }

  Header()
  Main()
  Home()
  Footer()
}

openApp()
