const cors = require("cors");
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');

require("dotenv").config();

var corsOptions = {
  // origin: "http://localhost:3000"
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Use the fileUpload Middleware
app.use(fileUpload());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// project routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

