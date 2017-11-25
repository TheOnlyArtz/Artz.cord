const GAME_TYPES = {
	0: 'Playing',
	1: 'Streaming'
};

/**
* A Game Structure meant to integrate with Presence class and control key properties
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} game A valid Game data Object
* @property {String} name Game's name
* @property {Number} type Game's type
* @property {String} url The streaming URL (if "streaming")
*/
class Game {
	constructor(client, game) {
		this.name = game.name;
		this.type = GAME_TYPES[game.type];
		this.url = !game.url ? null : game.url;
	}
}

module.exports = Game;
