var _ = require('lodash');
var moment = require('moment');

/**
 *
 * Controller to get the ratings example view. We get the current ratings from the RatingsService.
 *
 */
module.exports.getView = function (req, res) {

    return res.view('ratings/view', {

        ratingsData: RatingsService.getRatings()
    });

};


/**
 *
 * Controller to update a single rating.  Expects id param, and rating value in post data.
 *
 * This controller returns the updated item, which could be used to udpate the view, however we just console log the value
 * to indicate that it was received.
 *
 */
module.exports.updateRating = function (req, res) {

    var thingyId = req.params['thingyId'];

    var rating = req.body['rating'];

    console.log("Server received: thingyId='" + thingyId + "', rating='" + rating + "'");

    var updatedData = RatingsService.updateRating(thingyId, rating);

    return res.json(updatedData);
};
