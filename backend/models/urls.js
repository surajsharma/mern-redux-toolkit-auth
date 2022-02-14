const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            ref: "User"
        },

        url: {
            type: String,
            required: [true, "Please add a url"]
        },

        shortUrl: {
            type: String
        },

        encrypted: {
            type: Boolean
        }
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.model("Url", urlSchema);
