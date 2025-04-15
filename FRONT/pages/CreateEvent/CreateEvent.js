import { createPage } from '../../utils/functions/createPage'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Loader } from '../../components/Loader/Loader'
import { CustomAlert } from '../../components/CustomAlert/CustomAlert'
import './CreateEvent.css'

export const CreateEvent = () => {
  const div = createPage('create-event')
  const loader = Loader()

  div.innerHTML = `
  <div class="create-event-container">
    <h2 id="createEventTitle">GOT AN IDEA FOR A SWAP?</h2>
    <p id="createEventText">Fill out the form below to create a new event.</p>
     <form id="create-event-form" enctype="multipart/form-data">
      <label>Event Title</label>
      <input id="title" type="text" name="title" required />

      <label>Event Date</label>
      <input id="date" type="date" name="date" required />

      <label>Event Location</label>
      <input id="location" type="text" name="location" required />

      <label>Event Description</label>
      <textarea id="description" name="description" rows="5" required></textarea>
     
      <div class="upload-and-button">
        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Create Event</button>
      </div>
    </form>
  </div>
  `

  const createEvent = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitButton = e.target.querySelector('button[type="submit"]')

    const eventDate = new Date(formData.get('date'))
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (eventDate < today) {
      CustomAlert({
        message: 'The event date cannot be in the past.',
        onConfirm: () => {}
      })
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      CustomAlert({
        message: 'You must be logged in to create an event.',
        onConfirm: () => {}
      })
      return
    }

    div.appendChild(loader)
    submitButton.disabled = true

    try {
      await apiFetch('/events', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` }
      })

      CustomAlert({
        message: '🎉 Event created successfully. Happy Swapping! 🎊',
        onConfirm: () => {}
      })
      e.target.reset()
    } catch (error) {
      CustomAlert({
        message: `An error occurred: ${error.message}`,
        onConfirm: () => {}
      })
    } finally {
      loader.remove()
      submitButton.disabled = false
    }
  }

  div
    .querySelector('#create-event-form')
    .addEventListener('submit', createEvent)

  return div
}
