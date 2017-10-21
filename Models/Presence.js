const Game = require('./Game.js');

class Presence {
	constructor(client, data) {
		this.user = client.users.get(data.user.id);
		this.game = !data.game ? null : new Game(client, data.game);
		this.status = data.status;
	}
}

module.exports = Presence;
