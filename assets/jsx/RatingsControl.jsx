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

        for(var i = 0; i < displayValue; i++) {
            stars.push(
                <span key={"" + i} className="glyphicon glyphicon-star" onClick={this._changeRating.bind(this, i + 1)} onTouchEnd={this._changeRating.bind(this, i + 1)}></span>
            );
        }

        for (var j = displayValue; j < 5; j++) {
            stars.push(
                <span key={"" + j} className="glyphicon glyphicon-star-empty" onClick={this._changeRating.bind(this, j + 1)} onTouchEnd={this._changeRating.bind(this, j + 1)}></span>
            );
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