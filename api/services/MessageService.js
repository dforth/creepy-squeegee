// Super simple message service - uses flash on request with small amount of structure in case there are multiple messages

module.exports.infoMessage = function (req, message) {

    req.flash('info', message);
};

module.exports.successMessage = function (req, message) {

    req.flash('success', message);
};

module.exports.warningMessage = function (req, message) {

    req.flash('warning', message);
};

module.exports.errorMessage = function (req, message) {

    req.flash('danger', message);
};
