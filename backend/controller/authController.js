const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require('google-auth-library');

const Url = require("../models/urls");
const User = require("../models/user");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const googleLogin = asyncHandler(async (req, res) => {
    console.log(`google auth`.red.underline);

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    
    //redirect to sign-in after google

    res.status(200).json({ name, email, picture });
});


module.exports = {
    googleLogin
}