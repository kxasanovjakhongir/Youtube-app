const controller = require('../controllers/user.js')
const router = require('express').Router()

router.get('/', controller.GET)
router.get('/:userId', controller.GET)

module.exports = router