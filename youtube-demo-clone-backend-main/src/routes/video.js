const checkToken = require('../middlewares/checkToken.js')
const controller = require('../controllers/video.js')
const router = require('express').Router()
const multer = require('multer')
const videoUpload = multer()

router.get('/', controller.GET)
router.get('/download/videos/:videoPath', controller.DOWNLOAD)
router.get('/private', checkToken, controller.GET)
router.get('/:videoId', controller.GET)
router.post('/', checkToken, videoUpload.single('video'), controller.POST)


module.exports = router