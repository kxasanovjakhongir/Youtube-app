const fs = require('fs')
const path = require('path')
const { ClientError } = require('../utils/error.js')

//videos route for method GET

const GET = (req, res, next) => {
    try {
        const { videoId } = req.params
        let {
            page = req.PAGINATION.page,
                limit = req.PAGINATION.limit,
                search,
                userId
        } = req.query

        if (req.userId) {
            userId = req.userId
        }

        let videos = req.readFile('videos')
        let users = req.readFile('users')

        videos = videos.map(video => {
            video.user = users.find(user => {
                delete user.password
                return user.userId == video.userId
            })
            return video
        })

        if (videoId) {
            return res.json(videos.find(video => video.videoId == videoId))
        }

        videos = videos.filter(video => {
            let userFilter = userId ? video.userId == userId : true
            let searchFilter = search ? video.videoTitle.toLowerCase().includes(search.toLowerCase().trim()) : true
            video.videoCreatedAt = new Date().toISOString().slice(0, 10)

            return userFilter && searchFilter
        })

        videos = videos.slice(page * limit - limit, page * limit)

        return res.json(videos)

    } catch (error) {
        return next(error)
    }
}

//videos route for method POST


const POST = (req, res, next) => {
    try {
        let { videoTitle } = req.body
        videoTitle = videoTitle.trim()

        if (videoTitle.length < 1) {
            throw new ClientError(400, "videoTitle is required!")
        }

        if (videoTitle.length > 30) {
            throw new ClientError(413, "videoTitle is too long!")
        }

        if (!req.file) {
            throw new ClientError(400, "The video argument is required!")
        }

        const { size, mimetype, buffer, originalname } = req.file

        if (size > (50 * 1024 * 1024)) {
            throw new ClientError(413, "The file larger than 200MB!")
        }

        if (mimetype !== 'video/mp4') {
            throw new ClientError(415, "The file must be mp4!")
        }

        const fileName = Date.now() + originalname.replace(/\s/g, '')
        const pathName = path.join(process.cwd(), 'files', 'videos', fileName)
        fs.writeFileSync(pathName, buffer)

        const videos = req.readFile('videos')

        const newVideo = {
            videoId: videos.length ? videos[videos.length - 1].videoId + 1 : 1,
            userId: req.userId,
            videoTitle,
            videoUrl: '/videos/' + fileName,
            videoSize: (size / (2 ** 20)).toFixed(1),
            videoCreatedAt: Date()
        }

        videos.push(newVideo)
        req.writeFile('videos', videos)

        return res.status(201).json({
            video: newVideo,
            message: "The video has been added!"
        })

    } catch (error) {
        return next(error)
    }
}


//videos route for method DOWNLOAD

const DOWNLOAD = (req, res, next) => {
    try {
        const { videoPath } = req.params
        res.download(path.join(process.cwd(), 'files', 'videos', videoPath))
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    DOWNLOAD,
    POST,
    GET,
}