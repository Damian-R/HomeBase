var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"),
    router      = express.Router({mergeParams: true});

//new comment route
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
         if(!err){
             res.render("comments/new", {campground: campground});
         } else {
             console.log(err);
         }
    });
});

//create comment route
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(!err){
            Comment.create(req.body.comment, function(err, comment){
                if(!err){
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect("/campgrounds/" + campground._id);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
});

//edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(!err){
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        } else {
            res.redirect("back");
            console.log(err);
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(!err){
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.redirect("back");
            console.log(err);
        }
    });
});

//delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
        if(!err){
            req.flash("success", "Comment deleted successfully");
            console.log("successfully deleted comment with id " + deletedComment._id);
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    }) 
});

module.exports = router;