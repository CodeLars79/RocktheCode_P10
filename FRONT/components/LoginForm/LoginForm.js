import './LoginForm.css'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Button } from '../../components/Button/Button'
import { CustomAlert } from '../../components/CustomAlert/CustomAlert'
import { Loader } from '../../components/Loader/Loader'

export const LoginForm = () => {
  const form = document.createElement('form')
  form.className = 'login-form'
  form.setAttribute('autocomplete', 'on')
  const loader = Loader()

  form.innerHTML = `
    <div class="login-container">
      <h1>LOGIN</h1>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email" required autocomplete="email">
      <label for="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" id="password" required autocomplete="current-password">
    </div>
  `

  const loginButton = Button({
    text: 'LOGIN',
    type: 'submit',
    onClick: (e) => {
      e.preventDefault()
      handleLogin()
    }
  })

  const loginContainer = form.querySelector('.login-container')
  if (loginContainer) {
    loginContainer.appendChild(loginButton)
  }

  const validateInputs = () => {
    const email = form.querySelector('#email').value.trim()
    const password = form.querySelector('#password').value

    if (!email || !password) {
      CustomAlert({
        message: 'Please fill in both email and password.',
        onConfirm: () => {},
        onCancel: () => {}
      })
      return false
    }

    return { email, password }
  }

  const handleLogin = async () => {
    const loginData = validateInputs()
    if (!loginData) return

    form.appendChild(loader)

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
      CustomAlert({
        message: `Login failed: ${error.message}`,
        onConfirm: () => {},
        onCancel: () => {}
      })
    } finally {
      loader.remove()
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin()
  })

  return form
}
