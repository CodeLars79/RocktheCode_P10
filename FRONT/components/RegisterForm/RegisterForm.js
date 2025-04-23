import './RegisterForm.css'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Button } from '../../components/Button/Button'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import { CustomAlert } from '../../components/CustomAlert/CustomAlert'
import { Loader } from '../../components/Loader/Loader'

export const RegisterForm = (form) => {
  form.className = 'register-form'
  const loader = Loader()

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
    onClick: (e) => handleRegister(e)
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
      CustomAlert({
        message: 'All fields are required.',
        onConfirm: () => {},
        onCancel: () => {}
      })
      return false
    }

    if (password.length < 6) {
      CustomAlert({
        message: 'Password must be at least 6 characters long.',
        onConfirm: () => {},
        onCancel: () => {}
      })
      return false
    }

    if (password !== passwordRepeat) {
      CustomAlert({
        message: 'Passwords do not match.',
        onConfirm: () => {},
        onCancel: () => {}
      })
      return false
    }

    return { name, email, password }
  }

  const handleRegister = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()

    const registerData = validateInputs()
    if (!registerData) return

    // Show loader
    form.appendChild(loader)

    try {
      const response = await apiFetch('/users/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(registerData)
      })

      CustomAlert({
        message: 'Registration successful! You can now log in.',
        onConfirm: () => {
          form.querySelectorAll('input').forEach((input) => (input.value = ''))
          const loginRoute = routes.find((route) => route.path === '/login')
          if (loginRoute) {
            navigate(new Event('click'), loginRoute)
          } else {
            console.error('Navigation error: loginRoute is invalid', loginRoute)
          }
        },
        onCancel: () => {}
      })
    } catch (error) {
      console.error('Registration error:', error)
      CustomAlert({
        message: `Registration failed: ${error.message}`,
        onConfirm: () => {},
        onCancel: () => {}
      })
    } finally {
      loader.remove()
    }
  }

  form.addEventListener('submit', handleRegister)

  return form
}
