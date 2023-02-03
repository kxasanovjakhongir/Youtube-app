const { ServerError } = require('./utils/error.js')
const { PORT } = require('../config.js')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const app = express()

const modelMiddleware = require('./middlewares/model.js')
const paginationMiddleware = require('./middlewares/pagination.js')

app.use(cors({
  	origin: "*",
  	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  	preflightContinue: false
}))

app.use(express.json())
app.use(modelMiddleware)
app.use(paginationMiddleware)
app.use(express.static(path.join(process.cwd(), 'files')))

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const videoRouter = require('./routes/video.js')

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/videos', videoRouter)

app.use((error, req, res, next) => {
	if([400, 401, 404, 413, 415].includes(error.status)) {
		return res.status(error.status).send(error)
	} 
	
	fs.appendFileSync(
		path.join(process.cwd(), 'log.txt'),
	)

	return res.status(500).send(new ServerError(""))
})



app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))