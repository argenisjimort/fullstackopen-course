const loginRouter = require(`express`).Router();
const jsonWebToken = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);

const User = require(`../models/User`);

loginRouter.post(`/`, async (request, response, next) => {

    const { username, password } = request.body;
    const foundUser = await User.findOne({ username });

    //If no userFound witht he username
    if (!foundUser) return response.status(404).send({ error: `userNotFound` })

    //bcrypt.compare returns a promise that resolves either to true or false
    //since its a promise we gotta wait for it to resolve with 'await'
    if (!await bcrypt.compare(password, foundUser.passwordHash)) return response.status(401).send({error: `could Not authenticate User`})
    

    const loginToken = jsonWebToken
        .sign({username: foundUser.username, id: foundUser._id}, process.env.SECRET)
    
    response.status(200).json({loginToken, username: foundUser.username, name: foundUser.name});

})


//module.exports = {loginRouter} //is not the best way to do it

//bc then you would need to reference the property loginRouter
//inside the object you require
//ex: const router = require(`./loginRouter`).loginRouter

//better to just export the loginRouter itself, and not an object with it inside
module.exports = loginRouter;