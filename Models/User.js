class User {
	constructor(client, data) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = Boolean(data.bot);
		this.presence = client.presences.get(data.id) || "offline";
	}

	get tag() {
		return this.username + this.discriminator
	}

	toString() {
		return '<@' + this.id + '>'
	}
}

module.exports = User;
