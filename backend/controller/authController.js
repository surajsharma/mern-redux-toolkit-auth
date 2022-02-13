const asyncHandler = require("express-async-handler");

const Url = require("../models/urls");
const User = require("../models/user");

const googleLogin = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    console.log(users, { name, email, picture });

    //redirect to sign-in after google

    res.status(201);
    res.json({ name, email, picture });
});


module.exports = {
    googleLogin
}