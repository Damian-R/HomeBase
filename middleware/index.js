var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User    = require("../models/user");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){ // check if someone is logged in
        Campground.findById(req.params.id, function(err, campground){
            if(!err){
                if(campground.author.id.equals(req.user._id)){
                    return next(); // if the campground author is equal to the currently logged in user, move on
                } else {
                    req.flash("error", "You do not own that campground"); // if not, flash an error
                    res.redirect("back");
                }
            } else {
                req.flash("error", "Campground not found"); // if the campground couldn't even be found, flash an error
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!"); // if the user isn't even logged in, flash an error
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
    if(req.isAuthenticated()){ // simple check for if the user is currently logged in
        return next();
    }
}

middlewareObj.isProfileOwner = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, user){
            if(!err){
                if(user._id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "You are not the owner of that profile");
                    res.redirect("back");
                }
            } 
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
    
}

module.exports = middlewareObj;