

var users = [];
var rooms = [];


function updateUserRoom(userId, roomName) {

    for(var i=0; i < users.length; i++) {

        if (users[i].userId == userId) {

            users[i].room = roomName;
            break;
        }

    }
}





module.exports.addUser = function(userId, nick) {

    var user = {
        userId: userId,
        nick: nick,
        room: null
    };

    users.push(user);

    return user;
};

module.exports.getUser = function(userId) {

    console.log('getUser: ', userId);
    console.log('current users: ', users);

    var user =  _.find(users, {userId:userId});

    console.log('returning user: ', user);

    return user;

};

module.exports.removeUser = function(userId) {

    users = _.filter(users, function(user) {

        return user.userId != userId;
    });

    return users;
};

module.exports.changeNick = function(userId, newNick) {

    for(var i=0; i < users.length; i++) {

        if (users[i].userId == userId) {

            users[i].nick = newNick;
            return users[i];
        }
    }
};

module.exports.addUserToRoom = function(userId, roomName) {

    var room = _.find(rooms, {name: roomName});

    if (room == null) {

        room = {
            name: roomName,
            users: []
        };

        rooms.push(room);
    }

    room.users.push(userId);

    // Fix the user record as well
    updateUserRoom(userId, roomName);


};

module.exports.removeUserFromRoom = function(userId, roomName) {

    var room = _.find(rooms, {name: roomName});

    if (room != null) {

        room.users = _.filter(room.users, function(userId) {

            return userId != userId;
        });
    }

    // Fix the user record as well
    updateUserRoom(userId, roomName);

};

module.exports.getUsers = function() {

    return users;
};

module.exports.getRooms = function() {

    return rooms;
};

