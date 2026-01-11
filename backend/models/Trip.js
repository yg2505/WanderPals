const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    startingLocation: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    budget: {
        type: Number
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
