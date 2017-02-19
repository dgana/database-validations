var eventsModel = require('../models/eventsModel.js')

/**
 * eventsController.js
 *
 * @description :: Server-side logic for managing eventss.
 */
module.exports = {
  list: function (req, res) {
    eventsModel.find(function (err, eventss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting events.',
          error: err
        })
      }
      return res.json(eventss)
    })
  },

  show: function (req, res) {
    var id = req.params.id
    eventsModel.findOne({_id: id}, function (err, events) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting events.',
          error: err
        })
      }
      if (!events) {
        return res.status(404).json({
          message: 'No such events'
        })
      }
      return res.json(events)
    })
  },

  create: function (req, res) {
    var events = new eventsModel({      date: req.body.date,      title: req.body.title,      name: req.body.name,      email: req.body.email
    })

    events.save(function (err, events) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating events',
          error: err
        })
      }
      return res.status(201).json(events)
    })
  },

  update: function (req, res) {
    var id = req.params.id
    eventsModel.findOne({_id: id}, function (err, events) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting events',
          error: err
        })
      }
      if (!events) {
        return res.status(404).json({
          message: 'No such events'
        })
      }

      events.date = req.body.date ? req.body.date : events.date;      events.title = req.body.title ? req.body.title : events.title;      events.name = req.body.name ? req.body.name : events.name;      events.email = req.body.email ? req.body.email : events.email

      events.save(function (err, events) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating events.',
            error: err
          })
        }

        return res.json(events)
      })
    })
  },

  remove: function (req, res) {
    var id = req.params.id
    eventsModel.findByIdAndRemove(id, function (err, events) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the events.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}
