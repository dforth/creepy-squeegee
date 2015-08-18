

var ScrollerItem = React.createClass({

    render: function() {

        return (
            <div id={"scroller-item-" + this.props.id} className="scroller-item">
                {
                    <span>Scroller Item {this.props.data}</span>
                }
            </div>
        );
    }
});


var Scroller = React.createClass({

    getInitialState: function() {

        return {
            items: [],
            startIndex: 0
        };
    },
    componentDidMount: function() {

        if (this.props.items) {

            this.setState({
               items: this.props.items,
               startIndex: 0
            });
        }
    },
    _getItemsToDisplay: function() {

        var result = [];

        var index = this.state.startIndex;

        while (result.length < this.state.items.length && result.length <= this.props['maxVisible']) {

            result.push(this.state.items[index]);
            index = index + 1;

            if (index >= this.state.items.length) {

                index = 0;
            }
        }

        return result;
    },
    _moveLeft: function() {

        var index = this.state.startIndex;

        index = index - 1;

        if (index < 0) {

            index = this.state.items.length - 1;
        }

        this.setState({startIndex: index});
    },
    _moveRight: function() {

        var index = this.state.startIndex;

        index = index + 1;
        if (index >= this.state.items.length) {

            index = 0;
        }

        this.setState({startIndex: index});
    },
    render: function() {

        var items = this._getItemsToDisplay();

        return (
            <div id={"scroller-" + this.props.id} className="scroller">
                <a href="#" className="btn btn-default" onClick={this._moveLeft}>Left</a>
                {
                    items.map(function (item, index) {
                        return (
                            <ScrollerItem key={index} data={item} id={index}/>
                        );
                    })
                }
                <a href="#" className="btn btn-default" onClick={this._moveRight}>Right</a>
            </div>
        );
    }
});