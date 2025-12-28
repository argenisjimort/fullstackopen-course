//REQUESTLOGGER

/** @type {import('mongoose').Model} */
const User = require(`../models/User`);

const jsonWebToken = require(`jsonwebtoken`);


const morgan = require(`morgan`)
morgan.token(`postContent`, (req, res) => {
    if (req.method === `POST` || req.method === `PUT`) return JSON.stringify(req.body)
})


const loginTokenExtractor = (request, response, next) => {
    const authorization = request.get(`authorization`);

    //dont return anything
    //this middleware will run before the routers, and what its doing is:
    //take the request. (literally called request) extract the 'Authorization'
    //and add to the request a propertyy called tokenloginToken that then
    //the routers can Use
    if (authorization && authorization.startsWith(`Bearer`)) request.loginToken = authorization.replace(`Bearer `, ``);
    else request.loginToken = null

    next()
}


const userExtractor = async (request, response, next) => {
    const undecodedToken = request.loginToken;
    if (!undecodedToken) return response.status(401).send({ error: `missing TOKEN` })

    
    const decodedToken = jsonWebToken.verify(undecodedToken, process.env.SECRET);
    if (!decodedToken.id) return response.status(401).send({ error: `invalid token` })


    const foundUser = await User.findById(decodedToken.id)
    if(!foundUser) return response.status(401).send({error: `user Not found with ID`})
    //console.log(foundUser)
    
    request.user = foundUser;
    next()
}


const requestLogger = morgan(`:method :url :status :res[content-length] - :response-time ms :postContent`)
const unknownEndpoint = (request, response) => response.status(404).send({ error: `UnknownEndpoint` })

const errorHandler = (error, request, response, next) => {
    if (error.name === `CastError`) return response.status(400).send({ error: `malformated id` })
    if (error.name === `ValidationError`) return response.status(400).send({ error: error.message })
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) return response.status(400).json({ error: 'expected `username` to be unique' })
    if (error.name ===  'JsonWebTokenError') return response.status(401).json({ error: 'token invalid' })
    next(error)
}


module.exports = { requestLogger, unknownEndpoint, errorHandler, loginTokenExtractor, userExtractor };