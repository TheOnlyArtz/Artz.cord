const path = require('path');

const Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
const User = require(path.join(__dirname, '..', 'Models', 'User.js'));
const Structure = require(path.join(__dirname, '..', 'Models', 'Structure.js'));

/**
* An Invite Structure meant to control over Invite properties and methods
* @extends Structure
* @param {Object} client ArtzyCord;s Client instance
* @param {Object} data A valid Invite data Object
*/
module.exports = class Invite extends Structure{
	constructor(client, data) {
		super(client);
		this.inviter = client.users.get(data.invite.id) ? client.users.get(data.invite.id) : new User(client, data.inviter);
		this.guild = client.guilds.get(data.guild.id);
		this.inviteCode = data.code;
		this.createdTimestamp = data.created_at;
		this.uses = data.uses;
		this.maxUses = data.max_uses;
		this.channel = client.channels.get(data.channel.id);
	}

	/**
	* @returns {String} Retuns the invite link
	* @readonly
	* @property
	*/
	get link() {
		return 'https://discord.gg/' + this.inviteCode;
	}
};
