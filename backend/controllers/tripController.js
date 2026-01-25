const Trip = require('../models/Trip');
const User = require('../models/User');

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
    const { destination, startingLocation, startDate, endDate, description, budget, image } = req.body;

    if (!destination || !startingLocation || !startDate || !endDate) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
        return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    if (end < start) {
        return res.status(400).json({ message: 'End date must be after start date' });
    }

    const trip = await Trip.create({
        userId: req.user.id,
        destination,
        startingLocation,
        startDate,
        endDate,
        description,
        budget,
        image
    });

    // Add trip to user's trips array
    await User.findByIdAndUpdate(req.user.id, {
        $push: { trips: trip._id }
    });

    res.status(201).json(trip);
};

// @desc    Get user's trips
// @route   GET /api/trips
// @access  Private
const getMyTrips = async (req, res) => {
    const trips = await Trip.find({ userId: req.user.id }).sort({ startDate: 1 });
    res.status(200).json(trips);
};

// @desc    Find matches for a specific trip
// @route   GET /api/trips/:tripId/matches
// @access  Private
const getMatches = async (req, res) => {
    const { tripId } = req.params;

    const myTrip = await Trip.findById(tripId);
    if (!myTrip) {
        return res.status(404).json({ message: "Trip not found" });
    }

    if (myTrip.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: "Not authorized" });
    }

    // Find trips with same destination and overlapping dates, excluding my trip and my other trips
    // Also ensure matched trips haven't ended yet
    const matches = await Trip.find({
        destination: { $regex: new RegExp(myTrip.destination, 'i') }, // Case insensitive match
        _id: { $ne: myTrip._id },
        userId: { $ne: req.user.id },
        endDate: { $gte: new Date() }, // Matched trip must not have ended
        $or: [
            { startDate: { $gte: myTrip.startDate, $lte: myTrip.endDate } },
            { endDate: { $gte: myTrip.startDate, $lte: myTrip.endDate } },
            { startDate: { $lte: myTrip.startDate }, endDate: { $gte: myTrip.endDate } }
        ]
    }).populate('userId', 'name email avatar bio');

    // Second-layer Manual Filter: Guarantee no past trips in matches
    const now = new Date();
    const activeMatches = matches.filter(match => new Date(match.endDate) >= now);

    res.status(200).json(activeMatches);
}

// @desc    Get all trips (public)
// @route   GET /api/trips/all
// @access  Public
const getAllTrips = async (req, res) => {
    try {
        const { page = 1, limit = 8, sort, destination, minBudget, maxBudget } = req.query;

        // Filtering
        const query = {};
        if (destination) {
            query.destination = { $regex: destination, $options: 'i' };
        }
        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget) query.budget.$gte = Number(minBudget);
            if (maxBudget) query.budget.$lte = Number(maxBudget);
        }

        // Only show trips that haven't ended yet on the explore page
        query.endDate = { $gte: new Date() };

        // Sorting
        let sortOption = { createdAt: -1 }; // Default
        if (sort === 'price_asc') sortOption = { budget: 1 };
        if (sort === 'price_desc') sortOption = { budget: -1 };
        if (sort === 'date_asc') sortOption = { startDate: 1 };
        if (sort === 'date_desc') sortOption = { startDate: -1 };

        // Pagination
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let trips = await Trip.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber)
            .populate('userId', 'name email avatar');

        // Second-layer Manual Filter: Robust unix timestamp comparison
        const now = new Date();
        const nowTime = now.getTime();
        trips = trips.filter(trip => {
            if (!trip.endDate) return false;
            return new Date(trip.endDate).getTime() >= nowTime;
        });

        // Count strictly active trips for the total statistic
        const activeTotal = await Trip.countDocuments({
            ...query,
            endDate: { $gte: now }
        });

        res.status(200).json({
            trips,
            page: pageNumber,
            pages: Math.ceil(activeTotal / limitNumber),
            total: activeTotal
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createTrip,
    getMyTrips,
    getMatches,
    getAllTrips
};
