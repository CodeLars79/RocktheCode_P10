import './RegisterForm.css'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Button } from '../../components/Button/Button'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'

export const RegisterForm = (form) => {
  form.className = 'register-form'

  form.innerHTML = `
    <div class="register-container">
      <h1>CREATE A FREE ACCOUNT</h1>
      <label for="name"><b>Name</b></label>
      <input type="text" placeholder="Enter Name" name="name" id="name" required>
      <label for="email"><b>Email</b></label>
      <input type="email" placeholder="Enter Email" name="email" id="email" required>
      <label for="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" id="password" required>
      <label for="password-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="password-repeat" id="password-repeat" required>
    </div>
  `

  const registerButton = Button({
    text: 'SIGN UP',
    type: 'button',
    onClick: () => handleRegister()
  })

  const registerContainer = form.querySelector('.register-container')
  if (registerContainer) {
    registerContainer.appendChild(registerButton)
  }

  const validateInputs = () => {
    const name = form.querySelector('#name').value.trim()
    const email = form.querySelector('#email').value.trim()
    const password = form.querySelector('#password').value
    const passwordRepeat = form.querySelector('#password-repeat').value

    if (!name || !email || !password || !passwordRepeat) {
      alert('All fields are required.')
      return false
    }

    if (password !== passwordRepeat) {
      alert('Passwords do not match.')
      return false
    }

    return { name, email, password }
  }

  const handleRegister = async () => {
    const registerData = validateInputs()
    if (!registerData) return

    try {
      await apiFetch('/users/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(registerData)
      })

      alert('Registration successful! You can now log in.')
      form.reset()

      const loginRoute = routes.find((route) => route.path === '/login')
      if (loginRoute) {
        navigate(new Event('click'), loginRoute)
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert(`Registration failed: ${error.message}`)
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister()
  })
}
