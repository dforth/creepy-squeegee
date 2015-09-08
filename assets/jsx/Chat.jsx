





var ChatControls = React.createClass({
    _logoff: function() {

        if (this.props['logoffHandler']) {

            console.log('calling parent logoff');
            this.props['logoffHandler']();
        }
    },
    render: function() {

        var users = this.props.users;
        var rooms = this.props.rooms;

        return (
            <div className="chatControls">
                <div className="title">Users</div>
                <div>
                <ul>
                    {
                        users.map(function (user, index) {
                           return (
                               <li key={index}>{user.nick}</li>
                           )
                        })
                    }
                </ul>
                </div>
                <div className="title">Rooms</div>
                <div>
                <ul>
                    {
                        rooms.map(function (room, index) {
                            return (
                                <li key={index}>{room.name + "(" + room.users.length + ")"}</li>
                            )
                        })
                    }
                </ul>
                </div>
                <div className="chatLogoffButton">
                    <button onClick={this._logoff} className="btn btn-default">Logoff</button>
                </div>
            </div>
        );
    }
});

var ChatMessage = React.createClass({

    render: function() {

        var message = this.props.message;

        if (message.type == 'system') {

            return (
                <div className="message">
                    <span className="messageSystem">{message.message}</span>
                </div>
            );

        } else if (message.type == 'emote') {

            return (
                <div className="message">
                    <span className="messageEmote">{user.nick + " " + message.message}</span>
                </div>
            );

        } else {

            return (
                <div className="message">
                    <span className="messageSender">{message.user.nick + ": "}</span>
                    <span className="messageText">{message.message}</span>
                </div>
            );
        }
    }
});

var ChatMessages = React.createClass({

    render: function() {

        var messages = this.props.messages;

        return (
            <div className="chatMessages">
                {
                    messages.map(function (message, index) {
                        return (
                            <ChatMessage key={index} message={message} />
                        );
                    })
                }
            </div>
        );
    }
});

var ChatInput = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {

        return {

            message: ""
        };
    },

    _sendMessage: function(message) {

        if (this.props.sendHandler) {

            this.props.sendHandler(message);
        }
    },

    _keyDown: function(event) {

        if(event.keyCode == 13) {

            var message = this.state.message;

            this.setState({

                message: ""
            });

            this._sendMessage(message);
        }
    },

    render: function() {

        return (
            <div className="chatInput">
                <input type="text" name="inputText" id="inputText" placeholder="Your Message..." enabled="true" valueLink={this.linkState('message')} onKeyDown={this._keyDown}/>
            </div>
        );
    }
});


var Chat = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {

        return {
            user: null,
            users: [],
            rooms: [],
            messages: [],
            initialNick: '',
            initialRoom: ''
        };
    },
    componentDidMount: function() {

        io.socket.on("CHAT_EVENT", this._handleEvent);

    },
    componentWillUnmount: function() {

        this._logoff();
    },
    _handleEvent: function(message) {

        console.log('handleEvent: ', message);

        var messages = this.state.messages;

        messages.push(message);

        this.setState({
            messages: messages
        });

    },
    _sendMessage: function(message) {

        console.log('Chat._sendMessage: ', message);

        if (_.startsWith(message, "/nick")) {

            var newNick = message.substr(6);

            io.socket.post('/chat/nick', {nick: newNick}, function(data, jwres) {

                console.log("change nick Success: " , data);

                this.setState({
                    user: data.user
                });

            }.bind(this));

        } else if (_.startsWith(message, "/em")) {

            var emoteText = message.substring(4);

            io.socket.post('/chat/emote', {message: emoteText}, function(data, jwres) {

                console.log("emote Success: " , data);

            }.bind(this));

        } else {

            io.socket.post('/chat/send', {message: message}, function(data, jwres) {

                console.log("send Success: " , data);

            }.bind(this));
        }
    },
    _logon: function() {

        var data = {

            nick: this.state['initialNick']
        };

        io.socket.post('/chat/logon', data, function(data, jwres) {

            console.log("Logon Success: ", data);

            this.setState({
                user: data.user,
                users: data.users,
                rooms: data.rooms
            });

            // Now we need to connect to the selected channel
            io.socket.post('/chat/join', {room: this.state['initialRoom']}, function(data, jwres) {

                console.log("Join Success: ", data);

            });

        }.bind(this));

    },
    _logoff: function() {

        if (this.state.user != null) {

            io.socket.get('/chat/logoff', null, function(data, jwres) {

                console.log("Logoff Success: ", data);

                this.setState({
                    user: null
                });

            }.bind(this));
        }
    },
    render: function() {

        if (this.state.user != null) {

            var rooms = this.state.rooms;
            var user = this.state.user;
            var users = this.state.users;
            var messages = this.state.messages;

            return (
                <div className="chatWindow">
                    <div>
                        <ChatControls rooms={rooms} users={users} logoffHandler={this._logoff} />
                        <ChatMessages user={user} messages={messages} />
                        <ChatInput sendHandler={this._sendMessage}/>
                    </div>
                </div>
            );

        } else {

            return (
                <div className="chatWindow">
                    <div className="chatLogon">

                        <input type="text" id="nick" name="nick" placeholder="Nick" required="true" valueLink={this.linkState('initialNick')} />
                        <input type="text" id="channel" name="channel" placeholder="Channel" required="true" valueLink={this.linkState('initialRoom')}/>
                        <button className="btn btn-primary" onClick={this._logon}>Logon</button>
                    </div>
                </div>
            );

        }
    }
});