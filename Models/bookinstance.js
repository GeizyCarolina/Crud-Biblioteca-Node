const mongoose = require('mongoose');


const BookInstanceSchema = new mongoose.Schema({

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    imprint: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    due_back: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

const BookInstance = mongoose.model('BookInstance', BookInstanceSchema)
module.exports = BookInstance