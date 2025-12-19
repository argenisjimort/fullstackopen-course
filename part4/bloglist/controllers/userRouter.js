const usersRouter = require(`express`).Router();
const bcrypt = require(`bcrypt`);

/** @type {import('mongoose').Model} */ //this is is a 'hint' to that VSCODE knows the carateristic of the import, so you get hints
const User = require(`../models/User`);



usersRouter.get(`/`, async (request, response, next) => {
    const foundUsers = await User.find({});
    response.json(foundUsers); //respond with the user (after transforming to json)
    //this will also by default give status of 200
})

usersRouter.post(`/`, async (request, response, next) => {
    const {password, ...infoToInclude} = request.body;
    //10 is the saltRounds (how many times the password will be hashed) the more the more secure, but slower
    //this should not be required, bc express will handle the async errors
    // const createdUser = await User
    //     .create({...infoToInclude, passwordHash: await bcrypt.hash(password, 10)})
    //     .catch( err => next(err) );

    // if(!createdUser) return //exit of the function, do not exceture the rest

    const createdUser = await User.create({
        ...infoToInclude,
        passwordHash: await bcrypt.hash(password, 10)
    })
    
    response.status(201).json(createdUser);
})


module.exports = usersRouter;