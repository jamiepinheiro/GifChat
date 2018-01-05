class Rooms {
    constructor () {
        this.rooms = [];
    }

    newRoom () {
        var newRoom = {id: Date.now() + 31415, people: []};
        this.rooms.push(newRoom);
        return newRoom.id;
    }

    findRoomToJoin () {
        if (this.rooms[this.rooms.length - 1] && this.rooms[this.rooms.length - 1].people.length < 2){
            return this.rooms[this.rooms.length - 1].id;
        }
        return this.newRoom();
    }

    joinRoom (id, socketId) {
        var room = this.rooms.find((room) => room.id == id);
        if (room) {
            room.people.push(socketId);
        }
    }

    findRoomBySocket (socketId) {
        var room = this.rooms.find((room) => room.people.includes(socketId));

        if (room) {
            return room;
        }
    }

    leaveRoom (socketId) {
        var room = this.rooms.find((room) => room.people.includes(socketId));

        if (room) {
            room.people = room.people.filter((person) => person != socketId);

            if (room.people.length === 0) {
                this.rooms.pop(room);
            }
        }

    }


}

module.exports = {Rooms};
