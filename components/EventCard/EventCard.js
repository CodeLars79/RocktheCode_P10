import './EventCard.css'
import { apiFetch } from '../../utils/functions/apiFetch'

export const createEventCard = (event) => {
  const card = document.createElement('div')
  card.classList.add('event-card')

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleAddToFavorites = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) throw new Error('User not found in local storage')

      const userId = user.user._id
      const token = user.token

      const response = await apiFetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          events: [eventId]
        })
      })

      if (response.ok) {
        console.log('Event added to My Events')
      } else {
        console.error('Error adding event to My Events')
      }
    } catch (error) {
      console.error('Unexpected error', error)
    }
  }

  card.innerHTML = `
    <div class="event-image">
      <img src="${event.image}" alt="${event.title}" />
    </div>
    <div class="event-content">
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date"><img src="./assets/when.png" alt="time"> ${formattedDate}</p>
      <p class="event-location"><img src="./assets/where.png" alt="place"> ${event.location}</p>
      <p class="event-description">${event.description}</p>
      <button class="favorite-btn" data-event-id="${event._id}">&#9825</button> 
    </div>
  `

  const favoriteBtn = card.querySelector('.favorite-btn')
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      const eventId = favoriteBtn.getAttribute('data-event-id')
      handleAddToFavorites(eventId)
    })
  }

  return card
}
