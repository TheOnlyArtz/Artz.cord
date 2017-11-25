const Box = require('./Box.js');
const Presence = require('./Presence.js');
const Structure = require('./Structure.js');

/**
* A ClientUser Structure meant to control over Client's User properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} data A valid User object
* @property {String} username User's username
* @property {String} id User's ID
* @property {String} avatar User's avatar code
* @property {String} discriminator User's discriminator
* @property {Boolean} verified Whether the user is verified or not
* @property {Boolean} bot Whether the user is a bot or not
* @property {Box} DMs Box which contains DM instances
* @property {Object} presence default presence option
* @property {Object} clientPresence
* @property {Boolean} [clientPresence.afk = false] Whether the client is AFK or not
* @property {Number} [clientPresence.since] Since when the user started playing
* @property {String} [clientPresence.status] User's status (online, offline ...)
* @property {Object} [clientPresence.game] User's game object
*
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
		this.relationShips = data.relationships
		this.DMs = new Box(data.private_channels);
		this.presence = client.getOption('presence', {});
		this.clientPresence = {
			afk: this.presence.afk ? this.presence.afk : false,
			since: this.presence.since ? this.presence.since : null,
			status: this.presence.status ? this.presence.status : 'online',
			game: this.presence.game ? this.presence.game : null
		};
	}

	/**
	* Get user's tag
	* @readonly
	* @property {String} tag Returns user's tag (username + discriminator)
	* @example
	* console.log(client.user.tag) // -> user#xxxx
	*/
	get tag() {
		return this.username + this.discriminator;
	}

	/**
	* Set the game for the client
	* @param {Object} options the options keys
	* @param {String} [options.name] The Game's name
	* @param {String} [options.url = null] Whether you want your bot to "stream" or not
	* @example
	* // setting the client to stream
	* client.user.setGame({name: 'Look at my stream please', url: 'https://twitch.tv/theonlyartz'});
	*/
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

	/**
	* Set the game for the client
	* @param {String} status The status for the client
	* @example
	* // setting the client on do not disturb
	* client.user.setStatus('dnd');
	*
	* // setting the client on online
	* client.user.setStatus('online');
	*/
	setStatus(status) {
		if (!status) {
			throw new Error('You must specify the status.');
		}
		if (!status instanceof String) {
			throw new TypeError('Status can\'t be something else than a string.');
		}

		const presence = {
			status: status
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
