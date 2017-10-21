const Game = require('./Game.js');

class Presence {
	constructor(client, data) {
		this.game = !data.game ? null : new Game(client, data.game);
		this.status = data.status;
	}
}

module.exports = Presence;
