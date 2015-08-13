/**
 * Created by dforth on 7/14/15.
 */


function processIdString(stringValue, deDupeFlag, sortFlag, sortAscending) {

    if (stringValue !== undefined && stringValue != null) {

        if (deDupeFlag == null) {

            deDupeFlag = true;
        }

        if (sortFlag == null) {

            sortFlag = false;
        }

        if (sortAscending == null) {

            sortAscending = true;
        }

        var value = stringValue.trim().replace(/,|\D/g, ' ');

        var items = value.match(/(\d+?)(?:[\s|\D])|(\d+?)$/g);

        if (items != null) {
            var resultList = [];

            _.forEach(items, function (item) {
                item = item.trim();
                if (!isNaN(item) && item != '') {
                    resultList.push(parseInt(item));
                }
            });

            // Now that we have a clean list - de dupe
            if (deDupeFlag) {
                var deDuped = [];
                _.forEach(resultList, function (item) {

                    if (!_.contains(deDuped, item)) {

                        deDuped.push(item);
                    }
                });
                resultList = deDuped;
            }

            if (sortFlag) {
                // and sort
                resultList = resultList.sort(function (a, b) {
                    if (sortAscending) {
                        return a - b; // Ascending
                    } else {
                        return b - a; // Descending
                    }
                });
            }

            return resultList;

        } else {

            return [];
        }

    } else {

        return null;
    }
}