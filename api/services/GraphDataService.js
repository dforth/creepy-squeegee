// Service to manage data for the graph example.  We produce additional random data with every request

var graphData = null;

var maxDataPoints = 10;


function getRandomDataPoint() {

    return Math.floor(Math.random() * 100);
}

function initializeGraphData() {

    var data = [];

    for (var i=0; i<maxDataPoints; i++) {
        data.push(getRandomDataPoint());
    }

    return data;
}

module.exports.resetData = function() {

    graphData = initializeGraphData();
};

module.exports.getGraphData = function() {

    if (graphData == null) {

        this.resetData();
    }

    return graphData;
};

module.exports.updateData = function() {

    if (graphData == null) {

        this.resetData();

    } else {

        graphData.push(getRandomDataPoint());

        while (graphData.length > maxDataPoints) {

            graphData = graphData.slice(1);
        }
    }

    return graphData;
};