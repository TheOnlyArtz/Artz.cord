const GAME_TYPES = {
	0: 'Playing',
	1: 'Streaming'
};

class Game {
	constructor(client, game) {
		this.name = game.name;
		this.type = GAME_TYPES[game.type];
		this.url = !game.url ? null : game.url;
	}
}

module.exports = Game;
