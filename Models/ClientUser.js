class ClientUser {
	constructor(client, data) {
		this.username = data.user.username;
		this.id = data.user.id;
		this.discriminator = '#' + data.user.discriminator;
		this.verified = data.user.verified;
		this.bot = data.user.bot;
		this.relationShips = data.relationships;
		this.DMs = data.private_channels;
	}

	get tag() {
		return this.username + this.discriminator;
	}

	setPresence(presenceUpdate) {
		const packet = {
			op: 3,
			d: {
				game: !presenceUpdate.game
			}
		};
	}

}

module.exports = ClientUser;
