const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.get("/", function (req, res, next) {});
//importing routes
const movieRoute = require("./routes/movies");
const cinemaRoute = require("./routes/cinema");
const listingRoute = require("./routes/listing");
//middleware to handle and catch errors
app.use(errorHandler);

//setting the route naming
app.use("/movie", movieRoute);
app.use("/cinema", cinemaRoute);
app.use("/listing", listingRoute);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
