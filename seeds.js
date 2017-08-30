var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {   
        name: "Cloud's Rest", 
        image: "http://www.webreserv.com/catalog/stoneyforkllcnc/images/campground_tent_site_pic_rev._006.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet mollis magna, quis consequat quam. Aenean eu mollis tellus. Mauris quis risus a arcu vehicula vestibulum. Suspendisse potenti. Aliquam augue ex, elementum nec nulla vitae, luctus lobortis massa. Maecenas interdum pulvinar odio eu dignissim. Quisque id neque ac nisl gravida porttitor ac eget urna. Integer tellus justo, vulputate tristique ultrices id, porttitor at nunc. Morbi justo leo, dignissim sit amet rhoncus ut, rutrum id nulla. Duis consectetur odio ac enim auctor convallis. Aliquam nec ultricies quam. Nunc et venenatis odio. Nam quis orci sed nisi interdum viverra. Suspendisse commodo ante blandit, volutpat libero non, vestibulum quam. Sed lorem eros, laoreet ut egestas id, consectetur pellentesque augue. Nunc quis tempus risus."
    },
    {   
        name: "Desert Mesa", 
        image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1462757973/campground-photos/lpm3c3bysv6326lbvtux.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet mollis magna, quis consequat quam. Aenean eu mollis tellus. Mauris quis risus a arcu vehicula vestibulum. Suspendisse potenti. Aliquam augue ex, elementum nec nulla vitae, luctus lobortis massa. Maecenas interdum pulvinar odio eu dignissim. Quisque id neque ac nisl gravida porttitor ac eget urna. Integer tellus justo, vulputate tristique ultrices id, porttitor at nunc. Morbi justo leo, dignissim sit amet rhoncus ut, rutrum id nulla. Duis consectetur odio ac enim auctor convallis. Aliquam nec ultricies quam. Nunc et venenatis odio. Nam quis orci sed nisi interdum viverra. Suspendisse commodo ante blandit, volutpat libero non, vestibulum quam. Sed lorem eros, laoreet ut egestas id, consectetur pellentesque augue. Nunc quis tempus risus."
    },
    {   
        name: "Canyon Floor", 
        image: "http://soaringeaglecampground.com/test/wp-content/uploads/2014/01/view-of-the-basket-at-Soaring-Eagle.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet mollis magna, quis consequat quam. Aenean eu mollis tellus. Mauris quis risus a arcu vehicula vestibulum. Suspendisse potenti. Aliquam augue ex, elementum nec nulla vitae, luctus lobortis massa. Maecenas interdum pulvinar odio eu dignissim. Quisque id neque ac nisl gravida porttitor ac eget urna. Integer tellus justo, vulputate tristique ultrices id, porttitor at nunc. Morbi justo leo, dignissim sit amet rhoncus ut, rutrum id nulla. Duis consectetur odio ac enim auctor convallis. Aliquam nec ultricies quam. Nunc et venenatis odio. Nam quis orci sed nisi interdum viverra. Suspendisse commodo ante blandit, volutpat libero non, vestibulum quam. Sed lorem eros, laoreet ut egestas id, consectetur pellentesque augue. Nunc quis tempus risus."
    }
]

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(!err){
            console.log("removed campgrounds");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(!err){
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great",
                                author: "Homer"
                            }, function(err, comment){
                                if(!err){
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created a comment");
                                } else {
                                    console.log(err);
                                }
                            });
                    } else {
                        console.log(err);
                    }
                });
            });
        } else {
            console.log(err);
        }
    });
}

module.exports = seedDB;

