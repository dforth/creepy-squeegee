/**
 * React Control that represents a password input field with visiblity toggle.
 *
 * property: fieldName input control name
 * property: id additional value to make sure this is unique.
 *
 *
 */
var PasswordField = React.createClass({

    getInitialState: function() {
        // Initial state of the control - we could make this controllable via property
        return {
            secure: true
        };
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {

    },
    _handleClick: function(e) {

        e.stopPropagation();

        // Toggle security
        this.setState({secure: !this.state.secure});
    },
    render: function() {

        // Set things up to be secure
        var eyeClasses = "fa fa-lg fa-eye-slash";
        var inputType = "password";

        // Are we secure
        if (!this.state.secure) {

            eyeClasses = "fa fa-lg fa-eye";
            inputType = "text";
        }

        return (
            <div className="input-group" id={"passwordField-" + this.props.id}>
                <input
                    type={inputType}
                    name={this.props['fieldName']}
                    className="form-control"
                    placeholder="password"
                    required="true"
                    pattern=".{6,20}"
                    title="Requires between 6 and 20 characters." />
                  <span className="input-group-addon" onClick={this._handleClick} onTouchEnd={this._handleClick}><i className={eyeClasses} aria-hidden="true"></i></span>
            </div>
        );
    }
});
