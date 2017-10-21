class Game {
	constructor(client, game) {
		this.GAME_TYPES = {
			0: 'Playing',
			1: 'Streaming'
		};

		this.name = game.name;
		this.type = this.GAME_TYPES[game.type];
		this.url = !game.url ? null : game.url;
	}
}

module.exports = Game;
