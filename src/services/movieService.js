const Movie = require('../models/movie');

async function addMovie(movieData) {
  try {
    const movie = new Movie(movieData);
    await movie.save();
    return { status: 201, message: 'Movie added successfully', movie };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateMovie(id, movieData) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
    if (!updatedMovie) {
      return { status: 404, message: 'Movie not found' };
    }
    return { status: 200, message: 'Movie updated successfully', movie: updatedMovie };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteMovie(id) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return { status: 404, message: 'Movie not found' };
    }
    return { status: 200, message: 'Movie deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getMovieDetails(id) {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return { status: 404, message: 'Movie not found' };
    }
    return { status: 200, movie };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function listMovies(queryParams) {
  try {
    const movies = await Movie.find(queryParams);
    return { status: 200, movies };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  listMovies,
};
