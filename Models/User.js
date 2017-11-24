const Structure = require('./Structure.js');

/**
* A User Structure meant to control over User properties and methods
* @extends Structure
* @param client ArtzyCord's Client instance
* @param data A valid User data Object
*/
class User extends Structure {
	constructor(client, data) {
		super(client);
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = Boolean(data.bot);
		this.presence = client.presences.get(data.id) || "offline";
	}

	/**
	* @property
	* @readonly
	* @returns {String} Returns the user tag
	*/
	get tag() {
		return '#' + this.username + this.discriminator
	}

	/**
	* @returns {String} Returns the user's mention string
	* @example
	* message.channel.send(`${User.toString()}`);
	*/
	toString() {
		return '<@' + this.id + '>'
	}
}

module.exports = User;
