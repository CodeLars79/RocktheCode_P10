import './LoginForm.css'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Button } from '../../components/Button/Button'

export const LoginForm = (form) => {
  form.className = 'login-form'

  form.innerHTML = `
    <div class="login-container">
      <h1>LOGIN</h1>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" required>
      <label for="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" id="password" required>
    </div>
  `

  const loginButton = Button({
    text: 'LOGIN',
    type: 'button',
    onClick: () => handleLogin()
  })

  const loginContainer = form.querySelector('.login-container')
  if (loginContainer) {
    loginContainer.appendChild(loginButton)
  }

  const validateInputs = () => {
    const email = form.querySelector('#email').value.trim()
    const password = form.querySelector('#password').value

    if (!email || !password) {
      alert('Please fill in both email and password.')
      return false
    }

    return { email, password }
  }

  const handleLogin = async () => {
    const loginData = validateInputs()
    if (!loginData) return

    try {
      const response = await apiFetch('/users/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(loginData)
      })

      if (!response.token) {
        throw new Error('Token not received from server')
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.user._id)

      window.dispatchEvent(new Event('storage'))
      window.location.href = '/home'
    } catch (error) {
      console.error('Login error:', error)
      alert(`Login failed: ${error.message}`)
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin()
  })
}
