require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");

const cors = require("cors");

const restaurants = require("./routes/restaurants");

const app = express();
const port = process.env.PORT || "4008";

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/restaurants", restaurants);
app.use((req, res, next) => {
  res.send({ "1": "dsadsadsa" });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ result: [err.message] });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("SIGINT", () => {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
