const Event = require('../models/event')
const User = require('../models/user')

// Get all events
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()

    let userFavorites = []

    if (req.user) {
      const user = await User.findById(req.user.id)

      userFavorites = user.favorites.map((fav) => fav.toString())
    }

    const eventsWithFavoriteFlag = events.map((event) => ({
      ...event.toObject(),
      isFavorited: userFavorites.includes(event._id.toString())
    }))

    return res.status(200).json(eventsWithFavoriteFlag)
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching events', error })
  }
}

// Get an event by ID
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    return res.status(200).json(event)
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching the event', error })
  }
}

// Create a new event
const postEvent = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload is required' })
    }

    const { date, title, location, description } = req.body
    const eventDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (eventDate < today) {
      return res
        .status(400)
        .json({ message: 'The event date cannot be in the past' })
    }

    const eventData = {
      title,
      date,
      location,
      description,
      image: req.file.path,
      host: req.user.id
    }

    const newEvent = new Event(eventData)
    const event = await newEvent.save()
    return res
      .status(201)
      .json({ message: 'Event created successfully', event })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error creating event', error: error.message })
  }
}

// Update an existing event
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }
    return res
      .status(200)
      .json({ message: 'Event updated successfully', updatedEvent })
  } catch (error) {
    return res.status(400).json({ message: 'Error updating event', error })
  }
}

// Delete an event by ID
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id.toString()

    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    //* Aqui se verifica si el usuario es el host del evento
    const isHost = event.host.some((hostId) => hostId.toString() === userId)
    if (!isHost) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this event' })
    }

    const deletedEvent = await Event.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Event deleted successfully',
      deletedEvent
    })
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting event', error })
  }
}

// Get events created by logged-in user
const getMyEvents = async (req, res, next) => {
  try {
    const myEvents = await Event.find({ host: req.user.id })
    res.status(200).json(myEvents)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your events', error })
  }
}

// Get favorite events of logged-in user
const getFavoriteEvents = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites')
    res.status(200).json(user.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite events', error })
  }
}

// Toggle favorite
const toggleFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const eventId = req.params.id

    const isFavorited = user.favorites.includes(eventId)

    if (isFavorited) {
      user.favorites = user.favorites.filter((id) => id.toString() !== eventId)
    } else {
      user.favorites.push(eventId)
    }

    await user.save()

    res.status(200).json({ favorited: !isFavorited })
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite', error })
  }
}

module.exports = {
  getEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
  getFavoriteEvents,
  toggleFavorite
}
