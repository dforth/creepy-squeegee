

var ratingsData = null;

function getRandomRatingsData() {

    var data = [];

    for (var i=0; i<10; i++) {
        data.push({
           thingyId: i,
           userRating: null,
           averageRating:  Math.floor(Math.random() * 5)
        });
    }

    return data;
}

module.exports.getRatings = function() {

    if (ratingsData == null) {

        ratingsData = getRandomRatingsData();
    }

    return ratingsData;
};

module.exports.updateRating = function(thingyId, rating) {

    ratingsData[thingyId]["userRating"] = rating;

    return ratingsData[thingyId];
};