const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

const Book = mongoose.model('Book', BookSchema)
module.exports = Book