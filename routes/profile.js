var express = require("express"),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    User = require("../models/user"),
    router = express.Router();
    
router.get("/:id", middleware.isProfileOwner, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(!err){
            Campground.find({'author.id': user._id}, function(err, campgrounds){
                if(!err){
                    console.log(user.username);
                    console.log(campgrounds);
                    res.render("profile/show", {user: user, campgrounds: campgrounds});
                } else {
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
});

module.exports = router;