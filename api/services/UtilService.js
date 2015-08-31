/*
 * Utility methods that don't have a home.
 *
 */

module.exports.getVersion = function() {

    var packageJSON = require('../../package.json');

    return packageJSON.version;
};