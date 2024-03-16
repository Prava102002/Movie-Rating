const movieService = require('../services/movieService');

async function addMovie(req, res) {
  try {
    const movieData = req.body;
    const result = await movieService.addMovie(movieData);
    res.status(result.status).json({ message: result.message, movie: result.movie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const movieData = req.body;
    const result = await movieService.updateMovie(id, movieData);
    res.status(result.status).json({ message: result.message, movie: result.movie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const result = await movieService.deleteMovie(id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;
    const result = await movieService.getMovieDetails(id);
    res.status(result.status).json(result.movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function listMovies(req, res) {
  try {
    const queryParams = req.query;
    const result = await movieService.listMovies(queryParams);
    res.json(result.movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  listMovies,
};
