const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')

const {
  getEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
  getFavoriteEvents,
  toggleFavorite
} = require('../controllers/event')

const eventsRouter = require('express').Router()

eventsRouter.get('/', getEvents)
eventsRouter.get('/mine', isAuth, getMyEvents)
eventsRouter.get('/favorites', isAuth, getFavoriteEvents)
eventsRouter.post('/:id/favorite', isAuth, toggleFavorite)
eventsRouter.get('/:id', getEventById)
eventsRouter.post('/', [isAuth], upload.single('image'), postEvent)
eventsRouter.put('/:id', isAuth, updateEvent)
eventsRouter.delete('/:id', isAuth, deleteEvent)

module.exports = eventsRouter
