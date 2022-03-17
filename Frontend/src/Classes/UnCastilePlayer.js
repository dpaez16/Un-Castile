class UnCastilePlayer {
    constructor(metadata) {
        this.metadata = metadata;
    }

    /**
     * Gets the player's metadata (as a JS object).
     * @returns {Object} The player's metadata
     */
    getMetadata() {
        return this.metadata;
    }
};

module.exports = { UnCastilePlayer };