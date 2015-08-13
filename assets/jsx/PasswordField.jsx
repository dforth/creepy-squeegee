var PasswordField = React.createClass({

    getInitialState: function() {

        return {
            closed: true
        };
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {

    },
    _handleClick: function(e) {
        e.stopPropagation();

        this.setState({closed: !this.state.closed});
    },
    render: function() {

        var glyphClass = "glyphicon-eye-close glyphicon";
        var inputType = "password";

        if (!this.state.closed) {
            glyphClass = "glyphicon-eye-open glyphicon";
            inputType = "text";
        }

        return (
            <div className="input-group" id="passwordField">
                <input
                    type={inputType}
                    name={this.props['fieldName']}
                    className="form-control"
                    placeholder="password"
                    required="true"
                    pattern=".{6,20}"
                    title="Requires between 6 and 20 characters." />
                <span className="input-group-addon" onClick={this._handleClick}><span className={glyphClass}></span></span>
            </div>
        );
    }
});