class Rooms {
    constructor () {
        this.rooms = [];
    }

    newRoom () {
        var newRoom = {id: Date.now() + 31415, people: 0};
        this.rooms.push(newRoom);
        console.log(this.rooms);
        return newRoom.id;
    }

    findRoom () {
        if (this.rooms[this.rooms.length - 1] && this.rooms[this.rooms.length - 1].people < 2){
            return this.rooms[this.rooms.length - 1].id;
        }
        return this.newRoom();
    }

    joinRoom (id) {
        var room = this.rooms.find((room) => room.id == id);
        console.log(this.rooms, id, room);
        if (room) {
            room.people += 1;
        }
    }
}

module.exports = {Rooms};
