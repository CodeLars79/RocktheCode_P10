import './MyEvents.css'
import { createPage } from '../../utils/functions/createPage'
import { createEventCard } from '../../components/EventCard/EventCard'
import { apiFetch } from '../../utils/functions/apiFetch'

export const MyEvents = async () => {
  const div = createPage('my-events')
  div.innerHTML = `
    <section id="my-events">
      <h3 id="my-eventstitle">MY FAVORITE EVENTS</h3>
      <div class="loader" style="display: none;"></div>
      <ul id="my-events-container"></ul>
    </section>
  `

  const myEventsContainer = div.querySelector('#my-events-container')
  const loader = div.querySelector('.loader')

  const loadFavoriteEvents = async () => {
    myEventsContainer.innerHTML = ''
    loader.style.display = 'block'

    try {
      const favoriteEventIds = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      )

      if (favoriteEventIds.length === 0) {
        myEventsContainer.innerHTML =
          '<p id="nofavorite-text">No favorite events yet...</p>'
        loader.style.display = 'none'
        return
      }

      const allEvents = await apiFetch('/events')
      const favoriteEvents = allEvents.filter((event) =>
        favoriteEventIds.includes(event._id)
      )

      if (favoriteEvents.length === 0) {
        myEventsContainer.innerHTML = '<p>No favorite events yet.</p>'
      } else {
        favoriteEvents.forEach((event) => {
          const card = createEventCard(event)
          myEventsContainer.appendChild(card)
        })
      }
    } catch (error) {
      myEventsContainer.innerHTML = `<p class="error-message">Unable to load favorite events. Please try again later.</p>`
    } finally {
      loader.style.display = 'none'
    }
  }

  await loadFavoriteEvents()

  window.addEventListener('storage', (event) => {
    if (event.key === 'favorites') {
      loadFavoriteEvents()
    }
  })

  return div
}

export default MyEvents
