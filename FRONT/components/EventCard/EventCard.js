import './EventCard.css'
import { apiFetch } from '../../utils/functions/apiFetch'

export const createEventCard = (event) => {
  const card = document.createElement('div')
  card.classList.add('event-card')

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const userId = localStorage.getItem('userId')

  card.innerHTML = `
    <div class="event-image">
      <img src="${event.image}" alt="${event.title}" />
    </div>
    <div class="event-content">
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date"><img src="./assets/when.png" alt="time"> ${eventDate}</p>
      <p class="event-location"><img src="./assets/where.png" alt="place"> ${event.location}</p>
      <p class="event-description">${event.description}</p>
      <div class="event-actions"></div>
    </div>
  `

  const actionsContainer = card.querySelector('.event-actions')

  const favoriteBtn = document.createElement('button')
  favoriteBtn.classList.add('favorite-btn')
  favoriteBtn.setAttribute('data-event-id', event._id)
  updateFavoriteState(favoriteBtn, isFavorited(event._id))

  favoriteBtn.addEventListener('click', () => {
    toggleFavorite(event._id, favoriteBtn)
  })

  actionsContainer.appendChild(favoriteBtn)

  if (event.host.includes(userId)) {
    const hostText = document.createElement('p')
    hostText.classList.add('host-label')
    hostText.innerHTML = `
      <img src="./assets/profile.png" alt="Host" class="host-icon"> HOST
    `
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-btn')

    deleteBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await deleteEvent(event._id)

          let favorites = getFavorites()
          if (favorites.includes(event._id)) {
            favorites = favorites.filter((id) => id !== event._id)
            localStorage.setItem('favorites', JSON.stringify(favorites))
          }

          card.remove()
        } catch (error) {
          console.error('Failed to delete event:', error)
          alert('Failed to delete event. Please try again.')
        }
      }
    })
    actionsContainer.appendChild(hostText)
    actionsContainer.appendChild(deleteBtn)
  }

  return card
}

const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || []
const isFavorited = (eventId) => getFavorites().includes(eventId)

const toggleFavorite = (eventId, button) => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('You must be logged in to favorite an event!')
    return
  }

  let favorites = getFavorites()

  if (favorites.includes(eventId)) {
    favorites = favorites.filter((id) => id !== eventId)
  } else {
    favorites.push(eventId)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
  updateFavoriteState(button, isFavorited(eventId))
}

const updateFavoriteState = (button, favorited) => {
  if (favorited) {
    button.classList.add('favorited')
    button.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`
  } else {
    button.classList.remove('favorited')
    button.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`
  }
}

const deleteEvent = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('You must be logged in to delete an event!')
    return
  }

  try {
    const response = await apiFetch(`/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    alert('Event deleted successfully')
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}
