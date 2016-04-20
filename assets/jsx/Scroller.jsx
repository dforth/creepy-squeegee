

var ScrollerItem = React.createClass({

    _handleClick: function() {

      if (this.props.clickHandler) {

        this.props.clickHandler(this.props.data);
      }
    },
    render: function() {

        return (
            <div id={"scroller-item-" + this.props.id} className="scroller-item" onClick={this._handleClick}>
                <span>{this.props.data}</span>
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
    _canMoveLeft: function() {

      return (this.state.startIndex > 0 || this.props.wrap);
    },
    _moveLeft: function() {

        var index = this.state.startIndex;

        if (this._canMoveLeft()) {

          index = index - 1;

          if (index < 0) {

              index = this.state.items.length - 1;
          }

          this.setState({startIndex: index});
        }
    },
    _canMoveRight: function() {

      return (this.state.startIndex < (this.state.items.length - this.props.maxVisible) || this.props.wrap);
    },
    _moveRight: function() {

        var index = this.state.startIndex;

        if (this._canMoveRight()) {

          index = index + 1;
          if (index >= this.state.items.length) {

            index = 0;
          }

          this.setState({startIndex: index});
        }
    },
    _itemClickHandler: function(item) {

      alert("_itemClickHandler for: " + item);
    },
    render: function() {

        var items = this._getItemsToDisplay();

        // Left Button Classes
        var canMoveLeft = this._canMoveLeft();
        var leftButtonClasses = classNames({
          'scroller-button': true,
          'active' : canMoveLeft,
          'inactive' : !canMoveLeft
        });

        // Right Button Classes
        var canMoveRight = this._canMoveRight();
        var rightButtonClasses = classNames({
          'scroller-button': true,
          'active' : canMoveRight,
          'inactive' : !canMoveRight
        });

        return (
            <div id={"scroller-" + this.props.id} className="scroller">
                <a href="#"
                  className={leftButtonClasses}
                  onClick={this._moveLeft}
                  onTouchEnd={this._moveLeft}><span className="glyphicon glyphicon-chevron-left"></span></a>
                {
                    items.map(function (item, index) {
                        return (
                            <ScrollerItem key={index} data={item} id={index} clickHandler={this._itemClickHandler}/>
                        );
                    }.bind(this))
                }
                <a href="#"
                   className={rightButtonClasses}
                   onClick={this._moveRight}
                   onTouchEnd={this._moveRight}><span className="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        );
    }
});
