import './EventCard.css'

export const createEventCard = (event) => {
  const card = document.createElement('div')
  card.classList.add('event-card')

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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

  card.innerHTML = `
    <div class="event-image">
      <img src="${event.image}" alt="${event.title}" />
    </div>
    <div class="event-content">
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date"><img src="./assets/when.png" alt="time"> ${formattedDate}</p>
      <p class="event-location"><img src="./assets/where.png" alt="place"> ${event.location}</p>
      <p class="event-description">${event.description}</p>
      <button class="favorite-btn" data-event-id="${event._id}"></button> 
    </div>
  `

  const favoriteBtn = card.querySelector('.favorite-btn')
  if (favoriteBtn) {
    updateFavoriteState(favoriteBtn, isFavorited(event._id))
    favoriteBtn.addEventListener('click', () => {
      const eventId = favoriteBtn.getAttribute('data-event-id')
      toggleFavorite(eventId, favoriteBtn)
    })
  }

  return card
}
