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
    authRoutes          = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

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
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started on port " + process.env.PORT);
});