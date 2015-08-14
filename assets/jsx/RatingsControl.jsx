var RatingsControl = React.createClass({

    getInitialState: function() {

        return {
            value: 0
        };
    },
    componentDidMount: function() {

        if (this.props.initialValue) {

            this.setState({
                value: this.props.initialValue
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

        this.setState({value: newValue});
    },
    render: function() {

        var currentValue = this.state.value;
        var stars = [];

        for(var i = 0; i < currentValue; i++) {
            stars.push(
                <span key={"" + i} className="glyphicon glyphicon-star" onClick={this._changeRating.bind(this, i)}></span>
            );
        }

        for (var j = currentValue; j < 5; j++) {
            stars.push(
                <span key={"" + j} className="glyphicon glyphicon-star-empty" onClick={this._changeRating.bind(this, j + 1)}></span>
            );
        }

        return (
            <span id={"ratingsControl-" + this.props.id}>
                {
                    stars.map(function (star, index) {
                        return (star);
                    })
                }
            </span>
        );
    }
});