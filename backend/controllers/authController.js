const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age: req.body.age,
        country: req.body.country,
        state: req.body.state,
        avatar: req.body.avatar, // Allow setting avatar on registration
        bio: req.body.bio,
        languages: req.body.languages,
        travelStyle: req.body.travelStyle,
        interests: req.body.interests
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
            age: user.age,
            age: user.age,
            country: user.country,
            state: user.state,
            languages: user.languages,
            travelStyle: user.travelStyle,
            interests: user.interests,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
            age: user.age,
            age: user.age,
            country: user.country,
            state: user.state,
            travelStyle: user.travelStyle,
            languages: user.languages,
            interests: user.interests,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

const updateProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.avatar = req.body.avatar || user.avatar;
        user.age = req.body.age || user.age;
        user.age = req.body.age || user.age;
        user.country = req.body.country || user.country;
        user.state = req.body.state || user.state;
        user.travelStyle = req.body.travelStyle || user.travelStyle;
        // For arrays, if provided, replace. If not, keep existing.
        // Or could allow simpler logic. Let's assume if it's sent, we update it.
        if (req.body.languages) user.languages = req.body.languages;
        if (req.body.interests) user.interests = req.body.interests;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            bio: updatedUser.bio,
            age: updatedUser.age,
            age: updatedUser.age,
            country: updatedUser.country,
            state: updatedUser.state,
            languages: updatedUser.languages,
            travelStyle: updatedUser.travelStyle,
            interests: updatedUser.interests,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
};
