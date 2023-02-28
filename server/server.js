// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// // get driver connection
// const dbo = require("./db/conn");
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jamesrjrj:pass123@ibmshowcase.kcetsoa.mongodb.net/sample_weatherdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/data', (req, res) => {
  client.connect(err => {
    const collection = client.db("sample_weatherdata").collection("data");
    collection.find({}).toArray((err, data) => {
      res.send(data);
    });
    console.log(collection);
    console.log('words fam');
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});