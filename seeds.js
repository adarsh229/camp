var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments")
var data = [
    {name: "Himachal", image: "https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", description: "Beautiful"},
    {name: "Nagaland", image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80", description: "Amazing"},
    {name: "Manali", image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80", description: "Breathtaking"}
]

function seedDB () {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }

        console.log("removed");
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log("Created");
                } else {
                    console.log("added a camp");
                    Comment.create({
                        text:"great place",
                        author: "adarsh"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created a new comment");
                        }
                    })
                }
            })
        })
    })
    
}

module.exports = seedDB;