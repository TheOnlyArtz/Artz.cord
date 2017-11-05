const path = require('path');

const Guild = require(path.join(__dirname, '..', 'Models', 'Guild.js'));
const User = require(path.join(__dirname, '..', 'Models', 'User.js'));
module.exports = class Invite {
	constructor(client, data) {
		this.inviter = client.users.get(data.invite.id) ? client.users.get(data.invite.id) : new User(client, data.inviter);
		this.guild = client.guilds.get(data.guild.id);
		this.inviteCode = data.code;
		this.createdTimestamp = data.created_at;
		this.uses = data.uses;
		this.maxUses = data.max_uses;
		this.channel = client.channels.get(data.channel.id);
	}

	get link() {
		return 'https://discord.gg/' + this.inviteCode;
	}
};
