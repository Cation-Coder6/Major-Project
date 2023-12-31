require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const formatRouter = require("./routes/formatter-routes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Text-Answer-Handler.");
});

app.use("/api/v1/formatter", formatRouter);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
