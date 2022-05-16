const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const router = require("./routes/user");
const cors = require('cors')

app.use(cors())
//Route
app.get("/", function (req, res) {
  res.send("hello world");
});

app.use("/emp", router);
app.use(express.json());

//MongoDB connection
mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true});
const db =mongoose.connection
  db.once("open", function () {
    console.log("Database connected Successfully");
  })
  db.on("error", function (err) {
    console.log("Error", err);
  });

//Server
app.listen(8000, function () {
  console.log("Server is running");
});
