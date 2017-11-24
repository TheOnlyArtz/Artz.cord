const Box = require('./Box.js');
const Presence = require('./Presence.js');
const Structure = require('./Structure.js');

/**
* A ClientUser Structure meant to control over Client's User properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid User object
*/
class ClientUser extends Structure {
	constructor(client, data) {
		super(client);
		this.username = data.user.username;
		this.id = data.user.id;
		this.avatar = data.user.avatar;
		this.discriminator = '#' + data.user.discriminator;
		this.verified = data.user.verified;
		this.bot = data.user.bot;
		this.relationShips = new Box(data.relationships);
		this.DMs = new Box(data.private_channels);
		this.presence = client.getOption('presence', {});
		this.clientPresence = {
			afk: this.presence.afk ? this.presence.afk : false,
			since: this.presence.since ? this.presence.since : null,
			status: this.presence.status ? this.presence.status : 'online',
			game: this.presence.game ? this.presence.game : null
		};
	}

	get tag() {
		return this.username + this.discriminator;
	}

	setGame(options) {
		if (!options) {
			throw new Error('You must specify the game object');
		}
		const game = {
			game: {
				name: options.name
			}
		};

		if (options.url) {
			game.game.url = options.url;
			game.game.type = 1;
		}

		this._setPresence(game);
	}

	setStatus(options) {
		if (!options) {
			throw new Error('You must specify the status.');
		}
		if (!options instanceof String) {
			throw new TypeError('Status can\'t be something else than a string.');
		}

		const presence = {
			status: options
		};

		this._setPresence(presence);
	}

	_setPresence(presenceUpdate) {
		const packet = {
			op: 3,
			d: {
				game: presenceUpdate.game ? presenceUpdate.game : this.clientPresence.game,
				status: presenceUpdate.status ? presenceUpdate.status : this.clientPresence.status,
				afk: presenceUpdate.afk ? presenceUpdate.afk : this.clientPresence.afk,
				since: presenceUpdate.since ? presenceUpdate.since : this.clientPresence.since
			}
		};
		this.clientPresence = packet.d;
		this.client.ws.ws.send(JSON.stringify(packet));
	}

}

module.exports = ClientUser;
