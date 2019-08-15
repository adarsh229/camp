var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
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

app.get("/campgrounds", function(req, res) {
   

    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    campgrounds.push(newCamp);
   // res.send("post route ");

   res.redirect("/campgrounds"); //to get request
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(3000, function() {
    console.log("running at port 3000");
});