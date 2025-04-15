import './MyEvents.css'
import { createPage } from '../../utils/functions/createPage'
import { createEventCard } from '../../components/EventCard/EventCard'
import { apiFetch } from '../../utils/functions/apiFetch'
import { Loader } from '../../components/Loader/Loader'

export const MyEvents = async () => {
  const div = createPage('my-events')

  div.innerHTML = `
   
  <section id="my-events-container">
    <section id="my-hosted-events">
      <h3 class="my-eventstitle">MY HOSTED EVENTS</h3>
      <ul id="hosted-events-container"></ul>
    </section>

    <section id="my-favorite-events">
      <h3 class="my-eventstitle">MY FAVORITE EVENTS</h3>
      <ul id="favorite-events-container"></ul>
    </section>

    </section>
  `

  const hostedEventsContainer = div.querySelector('#hosted-events-container')
  const favoriteEventsContainer = div.querySelector(
    '#favorite-events-container'
  )

  const hostedLoader = Loader()
  const favoriteLoader = Loader()

  const loadHostedEvents = async () => {
    hostedEventsContainer.innerHTML = ''
    hostedEventsContainer.appendChild(hostedLoader)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        hostedEventsContainer.innerHTML = `<p class="error-message">You must be logged in to view your hosted events.</p>`
        return
      }

      const hostedEvents = await apiFetch('/events/mine', {
        headers: { Authorization: `Bearer ${token}` }
      })

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
      hostedLoader.remove()
    }
  }

  const loadFavoriteEvents = async () => {
    favoriteEventsContainer.innerHTML = ''
    favoriteEventsContainer.appendChild(favoriteLoader)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        favoriteEventsContainer.innerHTML = `<p class="error-message">You must be logged in to view your favorite events.</p>`
        return
      }

      const favoriteEvents = await apiFetch('/events/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (favoriteEvents.length === 0) {
        favoriteEventsContainer.innerHTML =
          '<p id="nofavorite-text">No favorite events yet...</p>'
      } else {
        favoriteEvents.forEach((event) => {
          const card = createEventCard(event)
          favoriteEventsContainer.appendChild(card)
        })
      }
    } catch (error) {
      favoriteEventsContainer.innerHTML = `<p class="error-message">Unable to load favorite events. Please try again later.</p>`
    } finally {
      favoriteLoader.remove()
    }
  }

  await loadHostedEvents()
  await loadFavoriteEvents()

  window.addEventListener('storage', (event) => {
    if (event.key === 'favorites') {
      loadFavoriteEvents()
    }
  })

  return div
}

export default MyEvents
