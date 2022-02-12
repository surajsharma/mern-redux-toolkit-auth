const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        url: {
            type: String,
            required: [true, "Please add a url"],
        },

        shortUrl: {
            type: String,
        },

    },
    {
        timeStamps: true,
    }
);


module.exports=mongoose.model('Url', urlSchema)