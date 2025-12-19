const mongoose = require(`mongoose`)

const userSchema = mongoose.Schema({
    username: {type: String, minlength: 3, required: true},
    name: {type: String, minlength: 1, require: true},
    passwordHash: {type: String, required: true},
    //this is an array of 'ID' of the blogs created by one person
    //the type signals its the id of another model
    //and ref says what model it references
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]

})


userSchema.set(`toJSON`, {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__V
        delete returnedObject.passwordHash //never return the passwordhash of the user
    }
})

module.exports = mongoose.model(`User`, userSchema);

