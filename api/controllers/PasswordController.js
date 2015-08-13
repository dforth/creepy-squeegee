var _ = require('lodash');
var moment = require('moment');


module.exports.getView = function (req, res) {

    return res.view('password/view', {

    });

};

module.exports.login = function (req, res) {

    var user = req.body.user;

    if (user) {

        MessageService.successMessage(req, "Server received: username='" + user.username + "', password='" + user.password + "'");

    } else {

        MessageService.errorMessage(req, "User information not sent. Check your code.");
    }

    return res.view('password/view', {

    });
};
