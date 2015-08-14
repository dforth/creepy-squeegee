var _ = require('lodash');
var moment = require('moment');

/**
 * Sails controller endpoint. I like to use fairly standard names for my controller methods. I use getView to always
 * get the basic view for a controller.
 *
 * This controller method just returns the password example view, and does not set any data for the view.
 *
 */
module.exports.getView = function (req, res) {

    return res.view('password/view', {

    });

};

/**
 * Controller function to handle the login action.  We aren't actually logging in a real user, so we just add a message
 * to the page to indicate that we received the data.
 *
 */
module.exports.login = function (req, res) {

    var user = req.body.user;

    if (user) {

        MessageService.successMessage(req, "Server received: username='" + user.username + "', password='" + user.password + "'");

    } else {

        MessageService.errorMessage(req, "User information not sent. Check your code.");
    }

    // We are redirecting back to the password page - this way we don't get the anoying resend post message
    return res.redirect('/password');
};
