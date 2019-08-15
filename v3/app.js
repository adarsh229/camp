var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.set("view engine", "ejs");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/acampv3", { useNewUrlParser: true });

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
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new");
})

//SHOW - shows more info about the camp
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    })
    //find the camp ground with provided id and show more info about that item 
   
})

app.listen(3000, function() {
    console.log("running at port 3000");
});