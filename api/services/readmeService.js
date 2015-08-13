var fs = require("fs");

module.exports.readReadme = function() {

    var contents = null;
    try {

        contents = fs.readFileSync("readme.md", "utf8");
        sails.log.debug('readme contents = ', contents);

    } catch(error) {

        sails.log.error('Error reading file:', error);
    }

    return contents;
};