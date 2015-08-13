var fs = require("fs");

module.exports.getFileContents = function(path) {

    var contents = null;
    try {

        contents = fs.readFileSync(path, "utf8");
        //sails.log.debug('contents = ', contents);

    } catch(error) {

        sails.log.error('Error reading file:', error);
    }

    return contents;
};

module.exports.clipTextBetween = function(text, startText, endText) {

    var result = text;

    if (startText) {

        var startIndex = text.indexOf(startText);
        if (startIndex > -1) {

            text = text.substr(startIndex);
        }
    }

    if (endText) {

        var endIndex = text.indexOf(endText);

        if (endIndex > -1) {

            text = text.substr(0, endIndex + endText.length);
        }
    }

    return text;
};