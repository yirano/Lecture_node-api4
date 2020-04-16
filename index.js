// this reads in all of our environment variables from .env
// require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const welcomeRouter = require("./welcome/welcome-router")
const shoutsRouter = require("./shouts/shouts-router")

const server = express()
// process.env.PORT is set on Heroku, use it if it's set.
// otherwise use a fallback value if `PORT` is not defined.
const port = process.env.PORT || 4000

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use("/", welcomeRouter)
server.use("/shouts", shoutsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
