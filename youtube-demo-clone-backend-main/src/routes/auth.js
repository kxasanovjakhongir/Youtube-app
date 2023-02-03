const { regValidation } = require('../middlewares/validation.js')
const checkToken = require('../middlewares/checkToken.js')
const controller = require('../controllers/auth.js')
const router = require('express').Router()
const multer = require('multer')
const imageUpload = multer()

router.post('/login', controller.LOGIN)
router.post('/register', imageUpload.single('file'), regValidation, controller.REGISTER)
router.get('/validateToken', checkToken, controller.VALIDATE_TOKEN)

module.exports = router