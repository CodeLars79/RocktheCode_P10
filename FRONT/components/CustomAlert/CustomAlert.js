import './CustomAlert.css'

export const CustomAlert = ({ message, onConfirm, onCancel }) => {
  const overlay = document.createElement('div')
  overlay.className = 'custom-alert-overlay'

  const wrapper = document.createElement('div')
  wrapper.className = 'custom-alert-wrapper'

  const alertBox = document.createElement('div')
  alertBox.className = 'custom-alert-box'

  let innerHTML = `
    <p class="poptext">${message}</p>
    <div class="custom-alert-buttons">
      <button class="confirm-button">OK</button>
      ${onCancel ? '<button class="cancel-button">Cancel</button>' : ''}
    </div>
  `

  alertBox.innerHTML = innerHTML
  wrapper.appendChild(alertBox)
  overlay.appendChild(wrapper)
  document.body.appendChild(overlay)

  alertBox.querySelector('.confirm-button').addEventListener('click', () => {
    onConfirm?.()
    document.body.removeChild(overlay)
  })

  if (onCancel) {
    alertBox.querySelector('.cancel-button').addEventListener('click', () => {
      onCancel()
      document.body.removeChild(overlay)
    })
  }
}
