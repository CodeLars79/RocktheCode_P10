import './Login.css'
import { createPage } from '../../utils/functions/createPage'
import { LoginForm } from '../../components/LoginForm/LoginForm'

export const Login = () => {
  const div = createPage('login')
  const form = document.createElement('form')
  LoginForm(form)
  div.appendChild(form)
  return div
}
