const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

const app = express();
const port = process.env.PORT || 4000; 

app.use(bodyParser.json());

// Use cors middleware to allow all origins
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
