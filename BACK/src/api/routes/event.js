const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event')

const eventsRouter = require('express').Router()

eventsRouter.get('/', getEvents)
eventsRouter.get('/:id', getEventById)
eventsRouter.post('/', [isAuth], upload.single('image'), postEvent)
eventsRouter.put('/:id', [isAuth], updateEvent)
eventsRouter.delete('/:id', [isAuth], deleteEvent)

module.exports = eventsRouter
