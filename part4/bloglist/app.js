const config = require(`./utils/config`);
const logger = require(`./utils/logger`);
const middleware = require(`./utils/middleware.js`)

const mongoose = require(`mongoose`);
const blogsRouter = require(`./controllers/blogRouter.js`);
const usersRouter = require(`./controllers/userRouter.js`);

const express = require('express')
const app = express()
app.use(express.json())

//connection with the mongoDB, and the blogsList collection
//app.use(middleware.requestLogger);

mongoose
    .connect(config.MONGODB_URI, {family: 4})
    .then( () => {
        logger.info(`connected to mongoDB`)
    })
    .catch( (err) => {
        logger.error(err);
    } )


app.use(`/api/blogs`, blogsRouter);
app.use(`/api/users`, usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
//this goes AFTER all the routes.
//I had the issue it was giving unknownendpoint
//going into `/api/blogs`



module.exports = app;