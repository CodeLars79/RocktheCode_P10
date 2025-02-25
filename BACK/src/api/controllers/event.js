const Event = require('../models/event')
const User = require('../models/user')

// Get all events
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
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

    const eventData = { ...req.body, image: req.file.path }
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
    const deletedEvent = await Event.findByIdAndDelete(id)
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }
    return res
      .status(200)
      .json({ message: 'Event deleted successfully', deletedEvent })
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting event', error })
  }
}

module.exports = {
  getEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent
}
