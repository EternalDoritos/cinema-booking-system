const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//importing routes
const movieRoute = require("./routes/movies");

//middleware to handle and catch errors
app.use(errorHandler);

//setting the route naming
app.use("/movie", movieRoute);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
