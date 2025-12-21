
const blogsRouter = require('express').Router();

/** @type {import('mongoose').Model} */ //this is is a 'hint' to that VSCODE knows the carateristic of the import, so you get hints
const Blog = require(`../models/Blog`);
const User = require(`../models/User`);


blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs);
    // Blog.find({}).then((blogs) => {
    //     response.json(blogs)
    // })
})

blogsRouter.post('/', async (request, response, next) => {

    const userTocreate = request.body;
    let userOwnerOfblog = await User.findById(userTocreate.user);
    //try to find a user with the id provided on request.body.user

    if(!userOwnerOfblog) { //if no userfound, just get the first user found on the DB
        userOwnerOfblog =  await User.findOne({});
        userTocreate.user = userOwnerOfblog._id;
    }

    const blogCreated = await Blog.create(userTocreate) //if error here it will go to the errorhandler
    userOwnerOfblog.blogs = userOwnerOfblog.blogs.concat(blogCreated._id);
    await userOwnerOfblog.save();
    
    response.status(201).json(blogCreated);//this would never execute. no need for try catch
    //bc im using express 5
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