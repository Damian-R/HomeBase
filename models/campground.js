var mongoose = require("mongoose");

// SCHEMA SETUP
var campSchema = mongoose.Schema({
     name: String,
     image: String,
     desc: String,
     price: String,
     comments: [
         {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
         }
    ],
    author: {
         id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
         },
         username: String
    }
});

module.exports = mongoose.model("Campground", campSchema);
