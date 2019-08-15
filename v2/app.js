var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/acamp", { useNewUrlParser: true });

//schema

var campGroundSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campGroundSchema);

// Campground.create(
//     {
//     name: "Himalayas",
//     image: "http://www.camp-liza.com/wp-content/uploads/2017/10/DSC_4608.jpg",
//     description: "Beautiful camping in the Himalayas"
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("created camp");
//         console.log(campground);
//     }
// })

app.use(bodyParser.urlencoded({extended: true}));
var campgrounds = [
    {name: "Nandi Hills", image: "https://www.photosforclass.com/download/flickr-1342367857"}, 
    {name: "Himalayas", image: "https://www.photosforclass.com/download/flickr-1430198323"}, 
    {name: "Eastern Ghats", image: "https://www.photosforclass.com/download/flickr-2770447094"},
    {name: "Nandi Hills", image: "https://www.photosforclass.com/download/flickr-1342367857"}, 
    {name: "Himalayas", image: "https://www.photosforclass.com/download/flickr-1430198323"}, 
    {name: "Nandi Hills", image: "https://www.photosforclass.com/download/flickr-1342367857"}, 
    {name: "Himalayas", image: "https://www.photosforclass.com/download/flickr-1430198323"}, 
    {name: "Nandi Hills", image: "https://www.photosforclass.com/download/flickr-1342367857"}, 
    {name: "Himalayas", image: "https://www.photosforclass.com/download/flickr-1430198323"}
];

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
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
    //find the camp ground with provided id and show more info about that item 
   
})

app.listen(3000, function() {
    console.log("running at port 3000");
});