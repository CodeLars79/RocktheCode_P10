import './Events.css'
import { createPage } from '../../utils/functions/createPage'
import { createEventCard } from '../../components/EventCard/EventCard'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Loader } from '../../components/Loader/Loader'
import { Arrow } from '../../components/Arrow/Arrow'

export const Events = () => {
  const div = createPage('events')
  const loader = Loader()

  div.innerHTML = `
    <section id="events">
      <div class="events-front">
        <img src="assets/events_bg.jpg" alt="Background" class="events-background">
        <h3 id="eventstitle">UPCOMING EVENTS</h3>
        <p id="eventsText">Check out the upcoming events and save your favorites... Happy swapping!</p>
      </div>
      <ul id="eventscontainer"></ul>
    </section>
  `

  const eventsContainer = div.querySelector('#eventscontainer')
  const arrow = Arrow()
  div.querySelector('.events-front').appendChild(arrow)

  const loadEvents = async () => {
    eventsContainer.innerHTML = ''
    eventsContainer.appendChild(loader)

    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      const events = await apiFetch('/events', { headers })

      const today = new Date()
      const upcomingEvents = events.filter(
        (event) => new Date(event.date) > today
      )

      upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

      eventsContainer.innerHTML = ''

      if (upcomingEvents.length === 0) {
        eventsContainer.innerHTML = `<p class="no-events-message">No upcoming events at the moment. Check back later!</p>`
        return
      }

      for (const event of upcomingEvents) {
        const card = createEventCard(event)
        eventsContainer.appendChild(card)
      }
    } catch (error) {
      console.error('Error loading events:', error)
      eventsContainer.innerHTML = `<p class="error-message">Unable to load events. Please try again later.</p>`
    } finally {
      loader.remove()
    }
  }

  loadEvents()

  return div
}

export default Events
