
const blogsRouter = require('express').Router();

/** @type {import('mongoose').Model} */ //this is is a 'hint' to that VSCODE knows the carateristic of the import, so you get hints
const Blog = require(`../models/Blog`);



blogsRouter.get('/', (request, response, next) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog.save()
        .then((result) => { response.status(201).json(result) })
        .catch(err => next(err))
})

blogsRouter.delete(`/:id`, (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).send())
        .catch(err => next(err))
})


blogsRouter.put(`/:id`, (request, response, next) => {
    Blog
        .findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true} )
        //if there is a response, return it, if not, return 404
        //by design if the id to edit doesnt exists express doesnt throw an error
        .then( res =>  res ? response.json(res) : response.status(404).send({ error: `bad request, item not found` }))
        .catch(err => next(err)) //this is for any other error beside the posible 404
})

module.exports = blogsRouter;