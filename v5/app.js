var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.set("view engine", "ejs");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/acampv3", { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

seedDB();

app.get("/", function(req, res) {
    res.render("landing")

})

//INDEX - get info about all camps 

app.get("/campgrounds", function(req, res) {
    //get all camp grounds from db 
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
   // res.render("campgrounds", {campgrounds: campgrounds});
})

//CREATE - post data to db

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc; //desc is the name attribute in the form
    var newCamp = {name: name, image: image, description: desc};
    //create a new camp and save to db
    Campground.create(newCamp, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
  
})

//NEW 

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
})

//SHOW - shows more info about the camp
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
    //find the camp ground with provided id and show more info about that item 
   
})

// ========================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
    
})

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})


// ========================================


app.listen(3000, function() {
    console.log("running at port 3000");
});