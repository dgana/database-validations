var express = require('express')
var router = express.Router()
var eventsController = require('../controllers/eventsController.js')

router.get('/', eventsController.list)
router.get('/:id', eventsController.show)
router.post('/', eventsController.create)
router.put('/:id', eventsController.update)
router.delete('/:id', eventsController.remove)

module.exports = router
