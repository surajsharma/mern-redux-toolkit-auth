const express  = require('express');

const colors = require('colors');
const dotenv = require('dotenv').config();

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT||5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server on port ${port}`))