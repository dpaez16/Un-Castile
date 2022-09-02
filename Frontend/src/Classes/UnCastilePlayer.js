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

    /**
     * Sets a value in the player's metadata.
     * @param {string} key - The key for associated value
     * @param {any} value - The value for the associated key
     */
    setValue(key, value) {
        this.metadata[key] = value;
    }

    toJSON() {
        return this.getMetadata();
    }

    /**
     * Decodes a JSON object into a `UnoPlayer` object.
     * @param {object} jsonObj - JSON object to be decoded into the `UnoPlayer` object
     * @returns {UnoPlayer} The created `UnoPlayer` objected
     */
    static decode(jsonObj) {
        const player = new UnCastilePlayer(jsonObj);
        return player
    }
};

module.exports = { UnCastilePlayer };