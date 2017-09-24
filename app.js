var bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    express     = require("express"),
    flash       = require("connect-flash"),
    mongoose    = require("mongoose"),
    seedDB      = require("./seeds"),
    User        = require("./models/user"),
    methodOverride = require("method-override"),
    app         = express();
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/auth"),
    profileRoutes       = require("./routes/profile");

console.log(process.env.DATABASEURL);

// ------------------------------------------------------------
//                             TODO
// 1. Add a rating system to campsites
// 2. Add a 'Your Comments...' section to profile page
// 3. Add a Google Maps location display for each campground
// 4. Make images of campgrounds a carousel
//
// ------------------------------------------------------------

mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://damian:damian@ds161823.mlab.com:61823/yelpcampdamianreiter", {useMongoClient: true});
// mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// seed database
// seedDB();

// passport config
app.use(require("express-session")({
    secret: "anything",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//route setup
app.use(authRoutes);
app.use("/profile", profileRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started on port " + process.env.PORT);
});