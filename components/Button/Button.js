import './Button.css'

export const Button = ({ id, text, onClick }) => {
  const button = document.createElement('button')
  if (id) button.id = id
  button.classList.add('main-button')
  button.textContent = text
  if (onClick) {
    button.addEventListener('click', onClick)
  }
  return button
}
