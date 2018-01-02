class Rooms {
    constructor () {
        this.rooms = [];
    }

    newRoom () {
        var newRoom = {id: Date.now() + 31415, people: 0};
        this.rooms.push(newRoom);
        return newRoom.id;
    }

    joinRoom () {
        if (this.rooms[this.rooms.length - 1] && this.rooms[this.rooms.length - 1].people < 2){
            return this.rooms[this.rooms.length - 1].id;
        }
        return this.newRoom();
    }
}

module.exports = {Rooms};
