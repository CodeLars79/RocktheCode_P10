import './Login.css'
import { createPage } from '../../utils/functions/createPage'
import { LoginForm } from '../../components/LoginForm/LoginForm'

export const Login = () => {
  const div = createPage('login')

  const form = LoginForm()
  div.appendChild(form)

  return div
}
