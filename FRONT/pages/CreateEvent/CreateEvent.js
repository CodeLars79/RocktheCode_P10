import { createPage } from '../../utils/functions/createPage'
import { apiFetch } from '../../utils/functions/apiFetch'
import './CreateEvent.css'

export const CreateEvent = () => {
  const div = createPage('create-event')
  div.innerHTML = `
    <form id="create-event-form" enctype="multipart/form-data">
      <div id="error-section"></div>
      <div id="success-message" class="hidden"></div> 

      <label>Event Title</label>
      <input id="title" type="text" name="title" required />

      <label>Event Date</label>
      <input id="date" type="date" name="date" required />

      <label>Event Location</label>
      <input id="location" type="text" name="location" required />

      <label>Event Description</label>
      <textarea id="description" name="description" rows="5" required></textarea>

      <label>Upload Image</label>
      <input type="file" name="image" accept="image/*" required />

      <button type="submit">Create Event</button>
    </form>
  `

  const createEvent = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const errorSection = div.querySelector('#error-section')
    const successMessage = div.querySelector('#success-message')

    const token = localStorage.getItem('token')
    if (!token) {
      errorSection.textContent = 'You must be logged in to create an event.'
      return
    }

    console.log('Token being sent:', token)

    try {
      await apiFetch('/events', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` }
      })

      successMessage.textContent =
        '🎉 Event created successfully. Happy Swapping! 🎊'
      successMessage.classList.remove('hidden')
      successMessage.classList.add('success')
      errorSection.textContent = ''
      e.target.reset()

      setTimeout(() => {
        successMessage.classList.add('hidden')
      }, 4000)
    } catch (error) {
      errorSection.textContent = `An error occurred: ${error.message}`
    }
  }

  div
    .querySelector('#create-event-form')
    .addEventListener('submit', createEvent)

  return div
}
