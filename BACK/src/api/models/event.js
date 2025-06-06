const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: { type: String, required: true },
    host: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  {
    timestamps: true,
    collection: 'events'
  }
)

const Event = mongoose.model('events', eventSchema, 'events')
module.exports = Event
