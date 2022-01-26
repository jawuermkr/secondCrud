const express = require("express");
const expressMyConnection = require("express-myconnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
app.use(
  expressMyConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "cruddatabase",
    },
    "single"
  )
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is for test the listen fron the port
app.listen(3001, () => {
  console.log("Running on port 3001");
});

app.use("/api", require("./src/rutas/peliculaRuta"));
