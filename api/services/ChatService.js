var users = [];
var rooms = [];

function updateUsersRoom(userId, roomName) {

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
            users: [userId]
        };

        rooms.push(room);

    } else {

        for (var i=0; i < rooms.length; i++) {

            if (rooms[i].name == roomName) {

                room[i].users.push(userId);
            }
        }
    }

    // Fix the user record as well
    updateUsersRoom(userId, roomName);

    return rooms;
};

module.exports.removeUserFromRoom = function(userId, roomName) {

    for (var i=0; i < rooms.length; i++) {

        if (rooms[i].name == roomName) {

            room[i].users = _.filter(room[i].users, function(userId) {

                return userId != userId;
            });
        }
    }

    // Fix the user record as well
    updateUsersRoom(userId, null);

    return rooms;
};

module.exports.getUsers = function() {

    return users;
};

module.exports.getRooms = function() {

    return rooms;
};

