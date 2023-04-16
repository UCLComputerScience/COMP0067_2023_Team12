const cors = require("cors");
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
//Serving Built React Web App Files
const path = __dirname + '/views/';
app.use(express.static(path));

require("dotenv").config();

var corsOptions = {
  // origin: "http://localhost:3000"
  origin: "*"
};
app.use(cors(corsOptions));

//Serving Built React Web App HomePage
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

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

app.use('/api/images', express.static('./public/uploads'));

// 'about' content routes
const aboutRoutes = require('./routes/aboutRoutes');
app.use('/api/about', aboutRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

