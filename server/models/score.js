var mongoose = require('mongoose');

var Score = mongoose.model('Score', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
});

module.exports = {Score};
