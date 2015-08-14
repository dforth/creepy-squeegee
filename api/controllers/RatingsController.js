var _ = require('lodash');
var moment = require('moment');


module.exports.getView = function (req, res) {

    return res.view('ratings/view', {

        ratingsData: RatingsService.getRatings()
    });

};


module.exports.updateRating = function (req, res) {

    var thingyId = req.params['thingyId'];

    var rating = req.body['rating'];

    console.log("Server received: thingyId='" + thingyId + "', rating='" + rating + "'");

    var updatedData = RatingsService.updateRating(thingyId, rating);

    return res.json(updatedData);
};
