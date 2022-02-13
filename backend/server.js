const express  = require('express');


const { OAuth2Client } = require('google-auth-library');


const colors = require('colors');
const dotenv = require('dotenv').config();

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT||5000;

connectDB();
const app = express();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);



app.use(errorHandler);

app.listen(port, () => console.log(`Server on port ${port}`))