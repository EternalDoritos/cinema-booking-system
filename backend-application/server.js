const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
