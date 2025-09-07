class Playlist {
    static id = 0;
    constructor(name) {
        this.id = id++;
        this.name = name;
        this.musics = [];
        this.ratings = [];
    }
};

export { Playlist };