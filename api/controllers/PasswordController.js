var _ = require('lodash');
var moment = require('moment');


module.exports.getView = function (req, res) {

    return res.view('password/view', {

    });

};

module.exports.login = function (req, res) {

    var user = req.body.user;

    MessageService.successMessage(req, "username: '" + user.username + "', password: '" + user.password + "'");

    return res.view('password/view', {

    });
};
