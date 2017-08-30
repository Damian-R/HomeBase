var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(!err){
                if(campground.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "You do not own that campground");
                    res.redirect("back");
                }
            } else {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(!err){
                if(comment.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("success", "You do not own that comment");
                    res.redirect("back");
                }
            } else {
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports = middlewareObj;