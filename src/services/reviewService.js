
const Review = require('../models/review');
const Movie = require('../models/movie');

async function addReview(userId, movieId, rating, text) {
  const review = new Review({ user: userId, movie: movieId, rating, text });
  await review.save();
  return review;
}

async function updateReview(userId, movieId, reviewId, rating, text) {
  const updatedReview = await Review.findOneAndUpdate(
    { _id: reviewId, movie: movieId, user: userId },
    { rating, text },
    { new: true }
  );
  return updatedReview;
}

async function deleteReview(userId, movieId, reviewId) {
  await Review.findOneAndDelete({ _id: reviewId, movie: movieId, user: userId });
}

async function listReviews(movieId) {
  const reviews = await Review.find({ movie: movieId });
  return reviews;
}

async function averageRating(movieId) {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }
  const reviews = await Review.find({ movie: movieId });
  if (reviews.length === 0) {
    throw new Error('No reviews found for this movie');
  }
  let totalRating = 0;
  reviews.forEach(review => {
    totalRating += review.rating;
  });
  return totalRating / reviews.length;
}

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  listReviews,
  averageRating,
};
