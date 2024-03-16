

const reviewService = require('../services/reviewService');

async function addReview(req, res) {
  try {
    const { id } = req.params;
    const { rating, text } = req.body;
    const review = await reviewService.addReview(req.user.id, id, rating, text);
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function updateReview(req, res) {
  try {
    const { movieId, reviewId } = req.params;
    const { rating, text } = req.body;
    const updatedReview = await reviewService.updateReview(req.user.id, movieId, reviewId, rating, text);
    res.json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function deleteReview(req, res) {
  try {
    const { movieId, reviewId } = req.params;
    await reviewService.deleteReview(req.user.id, movieId, reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function listReviews(req, res) {
  try {
    const { id } = req.params;
    const reviews = await reviewService.listReviews(id);
    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function averageRating(req, res) {
  try {
    const { id } = req.params;
    const averageRating = await reviewService.averageRating(id);
    res.json({ averageRating });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  listReviews,
  averageRating,
};
