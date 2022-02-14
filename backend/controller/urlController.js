const asyncHandler = require("express-async-handler");
var shortUrl = require("node-url-shortener");

const Url = require("../models/urls");
const User = require("../models/user");

//@desc     get urls
//@route    GET /api/urls
//@access   private
const getUrls = asyncHandler(async (req, res) => {
    const urls = await Url.find({ user: req.query.user });
    res.status(200).json(urls);
});

//@desc     shorten and set url with a key
//@route    POST /api/urls/:key
//@access   private
const setUrlWithKey = asyncHandler(async (req, res) => {

    if (!req.body.url) {
        res.status(400);
        throw new Error("Please add a Url");
    }

    if (!req.body.user) {
        res.status(400);
        throw new Error("Please add a User");
    }

    if(!req.body.key){
        res.status(400);
        throw new Error("Please add a Key for encryption");
    }

    const crypt = (salt, text) => {
        const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
        const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) =>
          textToChars(salt).reduce((a, b) => a ^ b, code);
    
        return text
          .split('')
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join('');
      };
        
    shortUrl.short(req.body.url, async (err, url) => {
        if (url) {
            const surl = await Url.create({
                url: req.body.url,
                user: req.body.user,
                shortUrl: crypt(req.body.key, url),
                encrypted: true
            });
            res.status(200).json(surl);
        }
    });
});

//@desc     shorten and set url
//@route    POST /api/urls
//@access   private
const setUrl = asyncHandler(async (req, res) => {
    if (!req.body.url) {
        res.status(400);
        throw new Error("Please add a Url");
    }

    if (!req.body.user) {
        res.status(400);
        throw new Error("Please add a User");
    }

    shortUrl.short(req.body.url, async (err, url) => {
        if (url) {
            const surl = await Url.create({
                url: req.body.url,
                user: req.body.user,
                shortUrl: url,
                encrypted: false
            });
            res.status(200).json(surl);
        }
    });
});

//@desc     update url
//@route    PUT /api/goals
//@access   private
const updateUrl = asyncHandler(async (req, res) => {
    const url = await Url.findById(req.params.id);

    if (!url) {
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
        new: true // create new if not there
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
    setUrlWithKey,
    updateUrl,
    deleteUrl
};
