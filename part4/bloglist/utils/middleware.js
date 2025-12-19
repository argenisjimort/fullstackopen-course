//REQUESTLOGGER
const morgan = require(`morgan`)
morgan.token(`postContent`, (req) => {
    if (req.method === `POST` || req.method === `PUT`) return JSON.stringify(req.body)
})

const requestLogger = morgan(`:method :url :status :res[content-length] - :response-time ms :postContent`)
const unknownEndpoint = (request, response) => response.status(404).send({ error: `UnknownEndpoint` })

const errorHandler = (error, request, response, next) => {
    if (error.name === `CastError`) return response.status(400).send({ error: `malformated id` })
    if (error.name === `ValidationError`) return response.status(400).send({ error: error.message })
    next(error)
}


module.exports = {requestLogger, unknownEndpoint, errorHandler};