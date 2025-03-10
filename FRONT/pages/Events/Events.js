import './Events.css'
import { createPage } from '../../utils/functions/createPage'
import { createEventCard } from '../../components/EventCard/EventCard'
import { apiFetch } from '../../utils/functions/apiFetch'

export const Events = () => {
  const div = createPage('events')
  div.innerHTML = `
    <section id="events">
      <h3 id="eventstitle">UPCOMING EVENTS</h3>
      <p id="eventsText">Check out the upcoming events and save your favorites... Happy swapping!</p>
      <img src="assets/arrow.png" alt="arrow" class="arrow-icon">
      <div class="loader" style="display: none;"></div>
      <ul id="eventscontainer"></ul>
    </section>
  `

  const loadEvents = async () => {
    const eventsContainer = div.querySelector('#eventscontainer')
    const loader = div.querySelector('.loader')

    try {
      loader.style.display = 'block'

      const events = await apiFetch('/events')

      const today = new Date()

      const upcomingEvents = events.filter(
        (event) => new Date(event.date) > today
      )

      upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

      for (const event of upcomingEvents) {
        const card = createEventCard(event)
        eventsContainer.appendChild(card)
      }
    } catch (error) {
      eventsContainer.innerHTML = `<p class="error-message">Unable to load events. Please try again later.</p>`
    } finally {
      loader.style.display = 'none'
    }
  }

  loadEvents()
  return div
}

export default Events
