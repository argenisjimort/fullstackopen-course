const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:  {type: String, required: true},
    author: {type: String, required: true},
    url: String,
    likes: {type: Number, default: 0},
    //this last field will containt the id of the ownwer of the Blog
    //(the user that created it)
    user: {type: mongoose.Schema.Types.ObjectId, ref: `User`}
    //type: mongoose.Schema.Types.ObjectId, will signal ir references an id of a model
    //and ref: will signal which model to reference
    //which is the first parameter at mongoose.model(`Blog`, blogSchema); on this case

})


//make npo typo here, otherwise, it wont thro an error, it just wont transform the item properly
blogSchema.set(`toJSON`, {
    transform: (document, returnedObject) => { //also make sure 'transform' exists other wise it wont transform anything
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model(`Blog`, blogSchema);
