const mongoose = require('mongoose');


const AuthorSchema = new mongoose.Schema({

    fist_name: {
        type: String,
        required: true,
    },
    family_name: {
        type: String,
        required: true,
    },
    date_birth: {
        type: Date,
        required: true,
    },
    date_death: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lifespan: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author