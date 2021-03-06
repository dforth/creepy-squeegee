/**
 * React Control to handle display and update of ratings.  This control expects a 0-5 value for user ratings, or average ratings.
 * If we have no user rating ( equals zero ), we display the average rating.
 *
 * property: id - make sure your controls have unique id's
 * property: userValue - user's value
 * property: averageValue - average system value
 * property: updateCallback - callback function with signature of (newValue, context)
 * property: updateContext - context object that will be passed to the update callback
 *
 */
var RatingsControl = React.createClass({

    getInitialState: function() {

        return {
            userValue: 0
        };
    },
    componentDidMount: function() {

        if (this.props['userValue']) {

            this.setState({
                userValue: this.props['userValue']
            })
        }
    },
    componentWillUnmount: function() {

    },
    _changeRating: function(newValue) {

        if (newValue < 0) {

            newValue = 0;

        } else if (newValue > 5) {

            newValue = 5;
        }

        if (newValue == this.state.userValue) {

            newValue = newValue - 1;
        }

        this.setState({userValue: newValue});

        this._updateServer(newValue);
    },
    _updateServer: function(value) {

        // If we have a function to call
        if (this.props['updateCallback']) {

            this.props['updateCallback'](value, this.props['updateContext']);
        }
    },
    render: function() {

        var displayValue = this.props['averageValue'];
        var starsClass = "ratings-control average-value";

        if (this.state.userValue > 0) {

            displayValue = this.state.userValue;
            starsClass = "ratings-control user-value";
        }

        var stars = [];

        var count = 0;
        for(var i = 0; i < Math.floor(displayValue); i++) {
            stars.push(
                <i key={"" + count} className="fa fa-lg fa-star clickable" onClick={this._changeRating.bind(this, count + 1)} onTouchEnd={this._changeRating.bind(this, count + 1)}></i>
            );
            count = count + 1;
        }

        if (displayValue % 1 > 0) {
          stars.push(
              <i key={"" + count} className="fa fa-lg fa-star-half-o clickable" onClick={this._changeRating.bind(this, count + 1)} onTouchEnd={this._changeRating.bind(this, count + 1)}></i>
          );
          count = count + 1;
          displayValue = Math.floor(displayValue) + 1;
        }

        for (var j = displayValue; j < 5; j++) {
            stars.push(
                <i key={"" + count} className="fa fa-lg fa-star-o clickable" onClick={this._changeRating.bind(this, count + 1)} onTouchEnd={this._changeRating.bind(this, count + 1)}></i>
            );
            count = count + 1;
        }

        return (
            <span id={"ratingsControl-" + this.props.id} className={starsClass}>
                {
                    stars.map(function (star) {
                        return (star);
                    })
                }
            </span>
        );
    }
});
