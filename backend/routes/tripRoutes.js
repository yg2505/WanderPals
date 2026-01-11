const express = require('express');
const router = express.Router();
const {
    createTrip,
    getMyTrips,
    getMatches,
    getAllTrips
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMyTrips).post(protect, createTrip);
router.route('/all').get(getAllTrips);
router.route('/:tripId/matches').get(protect, getMatches);

module.exports = router;
