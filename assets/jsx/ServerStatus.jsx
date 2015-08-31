var ServerStatus = React.createClass({

    getInitialState: function() {

        return {
            active: true
        };
    },
    _isActive: function() {

        return this.state.active;
    },
    _onConnect: function() {

        this.setState({active:true});
    },
    _onDisconnect: function() {

        this.setState({active:false});
    },
    componentDidMount: function() {

        io.socket.on('connect', this._onConnect);

        io.socket.on('disconnect', this._onDisconnect);
    },

    render: function() {

        var active = this.state.active;

        if (active == null) {

            return (
              <span className="text-warning" ><span className="glyphicon glyphicon-warning-sign"></span> Checking...</span>
            );

        } else if (active) {

            return (
                <span className="text-success" ><span className="glyphicon glyphicon-thumbs-up"></span> Live</span>
            );

        } else {

            return (
                <span className="text-danger" ><span className="glyphicon glyphicon-thumbs-down"></span> Not Active</span>
            );

        }

    }
});