const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db1 = require("./app/models");
db1.mongoose
  .connect(db1.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the project_list database!");
  })
  .catch(err => {
    console.log("Cannot connect to the project_list database!", err);
    process.exit();
  });

const db2 = require("./app/loginmodels");
db2.mongoose
  .connect(db2.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the admin_details database!");
  })
  .catch(err => {
    console.log("Cannot connect to the admin_details database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/routes/project.routes")(app);
require("./app/routes/login.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});