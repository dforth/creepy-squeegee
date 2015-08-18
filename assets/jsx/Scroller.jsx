

var ScrollerItem = React.createClass({

    render: function() {

        return (
            <div id={"scroller-item-" + this.props.id} className="scroller-item">
                {
                    <span>{this.props.data}</span>
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

        var maxVisible = this.props['maxVisible'];

        while (result.length < this.state.items.length && result.length < maxVisible) {

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
                <a href="#"
                   className="scroller-button"
                   onClick={this._moveLeft}
                   onTouchEnd={this._moveLeft}><span className="glyphicon glyphicon-chevron-left"></span></a>

                {
                    items.map(function (item, index) {
                        return (
                            <ScrollerItem key={index} data={item} id={index}/>
                        );
                    })
                }

                <a href="#"
                   className="scroller-button"
                   onClick={this._moveRight}
                   onTouchEnd={this._moveRight}><span className="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        );
    }
});