require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URI;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server running at " + PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

  // Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/movies', reviewRoutes);


app.get("/", (req, res) => {
  res.send({ message: "Hello World and pravallika" });
});
