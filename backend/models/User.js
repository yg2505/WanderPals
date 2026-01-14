const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    bio: {
        type: String,
        default: 'I love traveling!',
        maxLength: 200
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: ''
    },
    state: {
        type: String,
        required: true,
        default: ''
    },
    languages: {
        type: [String],
        default: []
    },
    travelStyle: {
        type: String,
        default: 'Explorer' // e.g., Backpacker, Luxury, Explorer, Foodie
    },
    interests: {
        type: [String],
        default: []
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
