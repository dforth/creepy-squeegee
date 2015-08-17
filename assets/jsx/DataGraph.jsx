var DataGraph = React.createClass({

    getInitialState: function() {

        return {
            graphData: []
        };
    },
    componentDidMount: function() {

        if (this.props['dataUrl']) {

            this._getGraphData();
            setInterval(this._getGraphData, this.props['pollInterval']);
        }
    },
    componentWillUnmount: function() {

    },
    _getGraphData: function() {
        $.ajax({
            url: this.props['dataUrl'],
            dataType: 'json',
            cache: false,
            success: function(data) {

                this.setState({

                    graphData: data.graphData
                });

            }.bind(this),
            error: function(xhr, status, err) {

                console.error(this.props['dataUrl'], status, err.toString());

            }.bind(this)
        });
    },
    render: function() {

        var data = this.state.graphData;

        return (
            <div id={"graphControl-" + this.props.id} className="graph-control">
                {
                    data.map(function (dataPoint, index) {
                        return (
                            <div className="graph-control-box" key={"dataPoint-" + index}
                                 style={{height: + dataPoint + "px"}}>
                            </div>
                        );
                    })
                }
                {
                    data.map(function (dataPoint, index) {
                      return (
                        <div className="graph-control-label" key={"dataLabel-" + index} >
                            {dataPoint}
                        </div>
                      )
                    })
                }
            </div>
        );
    }
});