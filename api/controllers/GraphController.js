/**
 *
 * Reset graph data and return it.
 *
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.resetGraphData = function(req, res) {

    GraphDataService.resetData();

    return res.json({
        graphData: GraphDataService.getGraphData()
    });
};

/**
 *
 * Return graph data - optionally update it first, via 'update' param.
 *
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.getGraphData = function (req, res) {

    var updateParam = req.query.update;

    if (updateParam) {

        return res.json({
            graphData: GraphDataService.updateData()
        });

    } else {

        return res.json({
            graphData: GraphDataService.getGraphData()
        });
    }
};
