var express = require("express"),
    router  = express.Router(),
    flash   = require("connect-flash"),
    passport = require("passport"),
    User    = require("../models/user");

router.use(flash());

router.get("/", function(req, res){
    res.render("landing");
});
    
//REGISTER
router.get("/register", function(req, res){
    res.render("register");
});

//register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(!err){
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
                console.log(user);
                res.redirect("/campgrounds");
            });
        } else {
            console.log(err);
            return res.render("register", {error: err.message});
        }
    });
});

//LOG IN
router.get("/login", function(req, res){
    res.render("login", { message: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "/campgrounds",
    failureFlash: "Invalid username or password"
}), function(req, res){
});

//LOG OUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "successfully logged out");
    res.redirect("/campgrounds");
});

module.exports = router;