
var CHAT_EVENT = "CHAT_EVENT";

function joinHelper(req, user, roomName) {

    if (roomName != null) {

        sails.sockets.join(req.socket, roomName);

        ChatService.addUserToRoom(user.userId, roomName);

        sails.log.debug('broadcasting chat event join');
        sails.sockets.broadcast(roomName, CHAT_EVENT, {type: "system", message: "user joined room " + roomName, user: user});
    }
}

function leaveHelper(req, user, roomName) {

    if (roomName != null) {

        sails.sockets.leave(req.socket, roomName);

        ChatService.removeUserFromRoom(user.userId, roomName);

        sails.log.debug('broadcasting chat event leave');
        sails.sockets.broadcast(roomName, CHAT_EVENT, {type: "system", message: "user leaving room " + roomName, user: user});
    }
}

module.exports.logon = function(req, res) {

    sails.log.debug("logon called");

    var socketId = sails.sockets.id(req.socket);
    var nick = req.body['nick'];

    var user = ChatService.addUser(socketId, nick);

    var users = ChatService.getUsers();

    var rooms = ChatService.getRooms();

    res.json({
        user: user,
        users: users,
        rooms: rooms
    });

};

module.exports.logoff = function(req, res) {

    sails.log.debug("logoff called");

    var socketId = sails.sockets.id(req.socket);

    var user = ChatService.getUser(socketId);

    leaveHelper(req, user, user.currentRoom);

    ChatService.removeUser(socketId);

    res.json({});

};

module.exports.changeNick = function(req, res) {

    var socketId = sails.sockets.id(req.socket);
    var newNick = req.param('nick');

    var user = ChatService.getUser(socketId);

    var oldNick = user['nick'];

    user = ChatService.changeNick(socketId, newNick);

    sails.sockets.broadcast(user['currentRoom'], CHAT_EVENT, {message: oldNick + " is now known as " + newNick + "."});
};


module.exports.joinRoom = function(req, res) {

    sails.log.debug('JoinRoom called');

    var roomName = req.body['room'];

    sails.log.debug('join room: ', roomName);

    var socketId = sails.sockets.id(req.socket);

    var user = ChatService.getUser(socketId);

    sails.log.debug('join user: ', user);

    leaveHelper(req, user, user.room);
    joinHelper(req, user, roomName);

    res.json({});
};


module.exports.sendMessage = function(req, res) {

    sails.log.debug("ChatController sendMessage");

    var message = req.body['message'];

    sails.log.debug("send message: ", message);

    var socketId = sails.sockets.id(req.socket);

    var user = ChatService.getUser(socketId);

    sails.log.debug("send user: ", user);

    sails.sockets.broadcast(user.room, CHAT_EVENT , {type: "user", user: user, message: message});

    res.json({});
};

module.exports.sendEMote = function(req, res) {

    var roomName = req.param['roomName'];

    var message = req.body['message'];

    var socketId = sails.sockets.id(req.socket);

    var user = ChatService.getUser(socketId);

    sails.sockets.broadcast(roomName, CHAT_EVENT , {user: user, message: message});

    res.json({});
};
