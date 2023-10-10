require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connectDB = require("./db/connect");
const promptRouter = require("./routes/promptRoutes");
const suffixRouter = require("./routes/suffixRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/db", promptRouter);
app.use("/api/v1/suffix", suffixRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Evil Meows Layer. This is the evil Prompt Enhancer.");
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
