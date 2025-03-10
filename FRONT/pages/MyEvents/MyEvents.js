import './MyEvents.css'
import { createPage } from '../../utils/functions/createPage'
import { createEventCard } from '../../components/EventCard/EventCard'
import { apiFetch } from '../../utils/functions/apiFetch'

export const MyEvents = async () => {
  const div = createPage('my-events')
  div.innerHTML = `
    <section id="my-hosted-events">
      <h3 class="my-eventstitle">MY HOSTED EVENTS</h3>
      <div class="loader" id="hosted-loader" style="display: none;"></div>
      <ul id="hosted-events-container"></ul>
    </section>

    <section id="my-favorite-events">
      <h3 class="my-eventstitle">MY FAVORITE EVENTS</h3>
      <div class="loader" id="favorite-loader" style="display: none;"></div>
      <ul id="favorite-events-container"></ul>
    </section>
  `

  const hostedEventsContainer = div.querySelector('#hosted-events-container')
  const favoriteEventsContainer = div.querySelector(
    '#favorite-events-container'
  )
  const hostedLoader = div.querySelector('#hosted-loader')
  const favoriteLoader = div.querySelector('#favorite-loader')

  const userId = localStorage.getItem('userId') // Get logged-in user's ID

  // Load Hosted Events
  const loadHostedEvents = async () => {
    hostedEventsContainer.innerHTML = ''
    hostedLoader.style.display = 'block'

    try {
      const allEvents = await apiFetch('/events')
      const hostedEvents = allEvents.filter((event) =>
        event.host.includes(userId)
      )

      if (hostedEvents.length === 0) {
        hostedEventsContainer.innerHTML =
          '<p id="nohosted-text">You are not hosting any events.</p>'
      } else {
        hostedEvents.forEach((event) => {
          const card = createEventCard(event)
          hostedEventsContainer.appendChild(card)
        })
      }
    } catch (error) {
      hostedEventsContainer.innerHTML = `<p class="error-message">Unable to load hosted events. Please try again later.</p>`
    } finally {
      hostedLoader.style.display = 'none'
    }
  }

  // Load Favorite Events
  const loadFavoriteEvents = async () => {
    favoriteEventsContainer.innerHTML = ''
    favoriteLoader.style.display = 'block'

    try {
      const favoriteEventIds = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      )

      if (favoriteEventIds.length === 0) {
        favoriteEventsContainer.innerHTML =
          '<p id="nofavorite-text">No favorite events yet...</p>'
        favoriteLoader.style.display = 'none'
        return
      }

      const allEvents = await apiFetch('/events')
      const favoriteEvents = allEvents.filter((event) =>
        favoriteEventIds.includes(event._id)
      )

      if (favoriteEvents.length === 0) {
        favoriteEventsContainer.innerHTML = '<p>No favorite events yet.</p>'
      } else {
        favoriteEvents.forEach((event) => {
          const card = createEventCard(event)
          favoriteEventsContainer.appendChild(card)
        })
      }
    } catch (error) {
      favoriteEventsContainer.innerHTML = `<p class="error-message">Unable to load favorite events. Please try again later.</p>`
    } finally {
      favoriteLoader.style.display = 'none'
    }
  }

  // Load both sections
  await loadHostedEvents()
  await loadFavoriteEvents()

  // Update favorite events in real-time if changed
  window.addEventListener('storage', (event) => {
    if (event.key === 'favorites') {
      loadFavoriteEvents()
    }
  })

  return div
}

export default MyEvents
