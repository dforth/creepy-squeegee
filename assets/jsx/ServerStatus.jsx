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

        this.setState({
            active:true
        });
    },
    _onDisconnect: function() {

        this.setState({
            active:false,
            beatToggle:false
        });
    },
    componentDidMount: function() {

        io.socket.on('connect', this._onConnect);

        io.socket.on('disconnect', this._onDisconnect);
    },

    render: function() {

        var active = this.state.active;

        if (active) {

            return (
                <span className="text-success" ><i className="fa fa-lg fa-thumbs-up"></i> <span className="bold">Live</span></span>
            );

        } else {

            return (
                <span className="text-danger" ><i className="fa fa-lg fa-thumbs-down"></i> Not Active</span>
            );

        }

    }
});
