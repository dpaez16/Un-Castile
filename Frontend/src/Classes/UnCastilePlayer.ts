class UnCastilePlayer {
    private playerNum: number;
    private metadata: any;

    constructor(playerNum: number, metadata: any) {
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

export { UnCastilePlayer };