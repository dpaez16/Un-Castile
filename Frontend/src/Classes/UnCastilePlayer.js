class UnCastilePlayer {
    constructor(playerNum, metadata) {
        this.playerNum = playerNum;
        this.metadata = metadata;
    }

    getPlayerNum() {
        return this.playerNum;
    }

    setPlayerNum(newPlayerNum) {
        this.playerNum = newPlayerNum;
    }

    getMetadata() {
        return this.metadata;
    }
};

module.exports = { UnCastilePlayer };