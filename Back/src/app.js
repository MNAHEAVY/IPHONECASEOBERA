const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const getRoutes = require("./routes/getProducts");

//MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Rutas

//productos

app.use("/", getRoutes);

//users

module.exports = app;
