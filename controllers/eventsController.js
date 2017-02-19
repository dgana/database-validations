var eventsModel = require('../models/eventsModel.js')

/**
 * eventsController.js
 *
 * @description :: Server-side logic for managing eventss.
 */
module.exports = {
  list: function (req, res) {
    eventsModel.find(function (err, events) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting events.',
          error: err
        })
      }
      return res.json(events)
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
    let emailRegex = /\S+@\S+\.\S+/

    // Data Validation!
    if (!emailRegex.test(req.body.email)) {
      res.json('Invalid Email Address!')
    } else if (!req.body.title) {
      res.json('Please Input the title!')
    } else if (!req.body.name) {
      res.json('Please Input the event description!')
    } else if (!req.body.date) {
      res.json('Please Input the event schedule!')
    } else {
      var events = new eventsModel({
        date: req.body.date,
        title: req.body.title,
        name: req.body.name,
        email: req.body.email
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
    }  },

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
