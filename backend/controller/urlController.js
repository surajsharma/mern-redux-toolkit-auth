const asyncHandler = require("express-async-handler");

const Url = require("../models/urls");
const User = require("../models/user");

//@desc     get urls
//@route    GET /api/urls
//@access   private
const getUrls = asyncHandler(async (req, res) => {
    const goals = await Url.find({ user: req.user.id });
    res.status(200).json(goals);
});

//@desc     shorten and set url
//@route    POST /api/urls
//@access   private
const setUrl = asyncHandler(async (req, res) => {
    if (!req.body.url) {
        res.status(400);
        throw new Error("Please add a Url");
    }

    const surl = await Goal.create({
        url: req.body.url,
        user: req.user.id,
        shortUrl:''//shortenUrl()
    });

    res.status(200).json(surl);
});

//@desc     update url
//@route    PUT /api/goals
//@access   private
const updateUrl = asyncHandler(async (req, res) => {
    const url = await Url.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Url not found");
    }

    const user = await User.findById(req.user.id);

    //check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    //make sure the logged in user matched the goal user
    if (url.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, {
        new: true,// create new if not there
    });

    res.status(200).json(updatedUrl);
});

//@desc     delete url
//@route    GET /api/url
//@access   private
const deleteUrl = asyncHandler(async (req, res) => {
    const url = await Url.findById(req.params.id);
    
    if (!url) {
        res.status(400);
        throw new Error("Url not found");
    }

    //check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    //make sure the logged in user matched the goal user
    if (url.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const deletedUrl = await Url.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: `deleted ${updatedUrl}` });
});

module.exports = {
    getUrls,
    setUrl,
    updateUrl,
    deleteUrl,
};
