import './Register.css'
import { createPage } from '../../utils/functions/createPage'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'

export const Register = () => {
  const div = createPage('register')
  const form = document.createElement('form')
  RegisterForm(form)
  div.appendChild(form)
  return div
}
