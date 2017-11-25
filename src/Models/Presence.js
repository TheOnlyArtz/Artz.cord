const Structure = require('./Structure.js');
const Game = require('./Game.js');

/**
* A Presence Structure meant to control over Presence properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid Presence data Object
*/
class Presence extends Structure {
	constructor(client, data) {
		super(client);
		this.game = !data.game ? null : new Game(client, data.game);
		this.status = data.status;
		this.user = data.user;
	}
}

module.exports = Presence;
