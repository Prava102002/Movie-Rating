

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

router.post('/:id/reviews', authMiddleware, reviewController.addReview);
router.put('/:movieId/reviews/:reviewId', authMiddleware, reviewController.updateReview);
router.delete('/:movieId/reviews/:reviewId', authMiddleware, reviewController.deleteReview);
router.get('/:id/reviews', authMiddleware, reviewController.listReviews);
router.get('/:id/averageRating', authMiddleware, reviewController.averageRating);

module.exports = router;
