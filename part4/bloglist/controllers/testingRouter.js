const testingRouter = require(`express`).Router()
const usersRouter = require(`../controllers/userRouter`)

/** @type {import('mongoose').Model} */ //this is is a 'hint' to that VSCODE knows the carateristic of the import, so you get hints
const Blog = require(`../models/Blog`)
/** @type {import('mongoose').Model} */
const User = require(`../models/User`)




testingRouter.post(`/reset`, async (request, response, next) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).send(`successful`)
})


module.exports = testingRouter